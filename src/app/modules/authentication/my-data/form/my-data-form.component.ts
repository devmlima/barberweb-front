import { DialogService } from './../../../../../@fuse/services/dialogs/dialog.service';
import { UserLoggedService } from './../../../../api/services/userLogged.service';
import { get } from 'lodash';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from './../../../../api/services/api.service';
import { FuseAlertType } from './../../../../../@fuse/components/alert/alert.types';
import { fuseAnimations } from './../../../../../@fuse/animations/public-api';
import { Component, ViewEncapsulation, OnInit, ChangeDetectorRef } from '@angular/core';

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
    notValid: boolean = false;
    formGroup: FormGroup;
    rota = '/signed-in-redirect';
    isNew = true;
    isHabilit = false;
    id: number = null;
    loading = false;

    constructor(
        private readonly _formBuilder: FormBuilder,
        private readonly _router: Router,
        private readonly _route: ActivatedRoute,
        private readonly _apiService: ApiService,
        private readonly _userLoggedService: UserLoggedService,
        private readonly _dialogService: DialogService,
        private readonly _dc: ChangeDetectorRef,
    ) { }

    ngOnInit(): void {
        this.formGroup = this._formBuilder.group({
            step1: this._formBuilder.group({
                email: ['', [Validators.required, Validators.email]],
                nome: ['', Validators.required],
                cpf: ['', []],
                celular: ['', []],
            }),
            step2: this._formBuilder.group({
                senhaAtual: ['', [Validators.minLength(8)]],
                novaSenha: ['', [Validators.minLength(8)]],
                confirmarSenha: ['', [Validators.minLength(8)]],
            }),
            step3: this._formBuilder.group({}),
        });

        this.loadingInstance();
    }

    loadingInstance(): void {
        this._route.params.subscribe((params) => {
            const userLogged = this._userLoggedService.get();
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
                    this.showAlert = true;
                    this._router.navigateByUrl(this.rota);
                },
                (err) => {
                    this.alert = {
                        type: 'error',
                        message: err,
                    };
                    this.showAlert = true;
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

    async modifyPassword() {
        this.loading = true;
        this._apiService.updatePassword({
            newPassword: this.formGroup.controls.step2.value.novaSenha,
            actualPassword: this.formGroup.controls.step2.value.senhaAtual
        })
            .subscribe(res => {
                this.loading = false;
                if (res && res.error) {
                    this._dialogService.showToast(`${res.error}`, null, null);
                } else {
                    this._dialogService.showToast('Senha alterada com sucesso!', null, null);
                }
            })
    }

    verifyPassword() {
        const password1 = this.formGroup.controls.step2.value.novaSenha;
        const password2 = this.formGroup.controls.step2.value.confirmarSenha;
        const isValid = password1 === password2;

        if (!isValid) {
            this.notValid = true;
            (this.formGroup.controls.step2 as any).controls.confirmarSenha.setErrors('notValid')
        } else {
            this.notValid = false;
        }

        this._dc.detectChanges();
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
