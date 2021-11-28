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
            },
        };

        objectReturn.id = this.id;
        objectReturn.nome = get(object, 'step1.nome', '');
        objectReturn.cpfCnpj = get(object, 'step1.cpfCnpj', '');
        objectReturn.celular = get(object, 'step1.celular', '');

        return objectReturn;
    }

    private convertForm(object) {
        const step1 = {
            nome: object.nome,
        };

        this.formGroup.get('step1').patchValue(step1);

        return object;
    }
}
