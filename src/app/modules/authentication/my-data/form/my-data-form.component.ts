import { UserLoggedService } from './../../../../api/services/userLogged.service';
import { get } from 'lodash';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from './../../../../api/services/api.service';
import { FuseAlertType } from './../../../../../@fuse/components/alert/alert.types';
import { fuseAnimations } from './../../../../../@fuse/animations/public-api';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { iif } from 'rxjs';

@Component({
    selector: 'my-data-form',
    templateUrl: './my-data-form.component.html',
    styleUrls: ['./my-data-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class MyDataComponent implements OnInit {
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    showAlert: boolean = false;
    formGroup: FormGroup;
    rota = '/signed-in-redirect';
    isNew = true;
    isHabilit = false;
    id: number = null;

    constructor(
        private readonly _formBuilder: FormBuilder,
        private readonly _router: Router,
        private readonly _route: ActivatedRoute,
        private readonly _apiService: ApiService,
        private readonly _userLoggedService: UserLoggedService
    ) {}

    ngOnInit(): void {
        this.formGroup = this._formBuilder.group({
            step1: this._formBuilder.group({
                email: ['', [Validators.required, Validators.email]],
                nome: ['', Validators.required],
                cpf: ['', []],
                celular: ['', []],
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
            const userLogged = this._userLoggedService.get();
            console.log(userLogged);
            this.id = userLogged.id;
            if (this.id) {
                this._apiService.userFindById(this.id).subscribe((res) => {
                    if (res) {
                        this.convertForm(res);
                    }
                });
            }
        });
    }

    // @TODO IMPLEMENTAR MUDANÇA DE SENHA AQUI

    save(): void {
        if (this.formGroup.valid) {
            const object = this.convertModel(this.formGroup.value);
            this._apiService.updateUser(object).subscribe(
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

    modifyPassword(isHabilit: boolean = false) {
        if (isHabilit) {
            this.isHabilit = true;
            return;
        }
    }

    private convertModel(object) {
        const objectReturn = {
            id: null,
            nome: null,
            cpf: null,
            email: null,
            celular: null,
            senha: null,
        };

        objectReturn.id = this.id;
        objectReturn.nome = get(object, 'step1.nome', '');
        objectReturn.cpf = get(object, 'step1.cpf', '');
        objectReturn.email = get(object, 'step1.email', '');
        objectReturn.celular = get(object, 'step1.celular', '');

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
