import { get } from 'lodash';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from './../../../../api/services/api.service';
import { FuseAlertType } from './../../../../../@fuse/components/alert/alert.types';
import { fuseAnimations } from './../../../../../@fuse/animations/public-api';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { iif } from 'rxjs';

@Component({
    selector: 'user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class UserFormComponent implements OnInit {
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    showAlert: boolean = false;
    formGroup: FormGroup;
    rota = 'authentication/user';
    isNew = false;
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
                email: ['', [Validators.required, Validators.email]],
                nome: ['', Validators.required],
                cpf: ['', []],
            }),
            step2: this._formBuilder.group({
                senha: ['', [Validators.minLength(8)]],
            }),
            step3: this._formBuilder.group({}),
        });

        this.loadingInstance();
    }

    loadingInstance(): void {
        this._route.params.subscribe((params) => {
            this.id = params.id;
            this._apiService.userFindById(params.id).subscribe((res) => {
                if (res) {
                    this.convertForm(res);
                } else {
                    this.isNew = true;
                }
            });
        });
    }

    save(): void {
        if (this.formGroup.valid) {
            const object = this.convertModel(this.formGroup.value);
            iif(
                () => this.isNew,
                this._apiService.createUser(object),
                this._apiService.updateUser(object)
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
            cpf: null,
            email: null,
            celular: null,
            senha: null,
            dataNascimento: null,
        };

        objectReturn.id = this.id;
        objectReturn.nome = get(object, 'step1.nome', '');
        objectReturn.cpf = get(object, 'step1.cpf', '');
        objectReturn.email = get(object, 'step1.email', '');
        objectReturn.celular = get(object, 'step1.celular', '');
        objectReturn.dataNascimento = get(object, 'step1.dataNascimento', '');

        if (this.id) {
            delete objectReturn.senha;
        } else {
            objectReturn.senha = get(object, 'step2.senha', '');
        }

        return objectReturn;
    }

    private convertForm(object) {
        const step1 = {
            email: object.email,
            nome: object.nome,
            cpf: object.cpf,
        };

        const step2 = {};

        this.formGroup.get('step1').patchValue(step1);
        this.formGroup.get('step2').patchValue(step2);

        return object;
    }
}
