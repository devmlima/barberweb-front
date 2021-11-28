import { State } from './../../../../api/models/state';
import { get } from 'lodash';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from './../../../../api/services/api.service';
import { FuseAlertType } from './../../../../../@fuse/components/alert/alert.types';
import { fuseAnimations } from './../../../../../@fuse/animations/public-api';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { iif } from 'rxjs';

@Component({
    selector: 'client-form',
    templateUrl: './client-form.component.html',
    styleUrls: ['./client-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class ClientFormComponent implements OnInit {
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    showAlert: boolean = false;
    formGroup: FormGroup;
    rota = 'operations/client';
    isNew = true;
    id: number = null;
    uf: string = '';

    constructor(
        private readonly _formBuilder: FormBuilder,
        private readonly _router: Router,
        private readonly _route: ActivatedRoute,
        private readonly _apiService: ApiService
    ) {}

    ngOnInit(): void {
        this.formGroup = this._formBuilder.group({
            step1: this._formBuilder.group({
                nome: ['', [Validators.required]],
                cpfCnpj: ['', []],
                celular: ['', []],
            }),
            step2: this._formBuilder.group({
                cidadeId: ['', []],
                estadoId: ['', []],
                rua: ['', []],
                bairro: ['', []],
                numero: ['', []],
                cep: ['', []],
            }),
        });

        this.loadingInstance();
    }

    loadingInstance(): void {
        this._route.params.subscribe((params) => {
            this.id = params.id;
            if (this.id) {
                this._apiService.clientFindById(params.id).subscribe((res) => {
                    if (res) {
                        this.convertForm(res);
                        this.isNew = false;
                    } else {
                        this.isNew = true;
                    }
                });
            }
        });
    }

    save(): void {
        if (this.formGroup.valid) {
            const object = this.convertModel(this.formGroup.value);
            iif(
                () => this.isNew,
                this._apiService.createClient(object),
                this._apiService.updateClient(object)
            ).subscribe(
                (res) => {
                    this.alert = {
                        type: 'success',
                        message: 'Registro criado com sucesso',
                    };

                    this._router.navigateByUrl(this.rota);
                },
                (err) => {
                    this.alert = {
                        type: 'error',
                        message:
                            'Ocorreu um erro, verifique as informações preenchidas!',
                    };
                }
            );
        } else {
            this.alert = {
                type: 'error',
                message:
                    'Formulário inválido, verifique as informações preenchidas!',
            };
            this.showAlert = true;
        }
    }

    back(): void {
        this._router.navigate([`${this.rota}`]);
    }

    selectState(event: State) {
        this.uf = event ? event.sigla : '';
    }

    searchCep(){
        this._apiService.searchCep({cep: this.formGroup.value.step2.cep}).subscribe( res => {
            if (res) {
                this.formGroup.controls.step2.patchValue(res);
                this.uf = res.estadoId.sigla;
            }
        })
    }

    private convertModel(object) {
        const objectReturn = {
            id: null,
            nome: null,
            cpfCnpj: null,
            celular: null,
            endereco: {
                cidadeId: null,
                estadoId: null,
                rua: null,
                numero: null,
                cep: null,
                bairro: null,
            },
        };

        objectReturn.id = this.id;
        objectReturn.nome = get(object, 'step1.nome', '');
        objectReturn.cpfCnpj = get(object, 'step1.cpfCnpj', '');
        objectReturn.celular = get(object, 'step1.celular', '');

        objectReturn.endereco = {
            cidadeId: get(object, 'step2.cidadeId.id', ''),
            estadoId: get(object, 'step2.estadoId.sigla', ''),
            rua: get(object, 'step2.rua', ''),
            numero: get(object, 'step2.numero', ''),
            cep: get(object, 'step2.cep', ''),
            bairro: get(object, 'step2.bairro', ''),
        };

        return objectReturn;
    }

    private convertForm(object) {
        const step1 = {
            id: object.id,
            nome: object.nome,
            celular: object.celular,
            cpfCnpj: object.cpfCnpj,
        };

        const address = object.address;

        const step2 = {
            cidadeId: address.city,
            estadoId: address.state,
            rua: address.rua,
            bairro: address.bairro,
            numero: address.numero,
            cep: address.cep,
        };

        this.formGroup.get('step1').patchValue(step1);
        this.formGroup.get('step2').patchValue(step2);
        this.uf = step2.estadoId.sigla;

        return object;
    }
}
