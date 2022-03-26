import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { DialogService } from './../../../../@fuse/services/dialogs/dialog.service';
import { ApiService } from './../../../api/services/api.service';
import { UserLoggedService } from './../../../api/services/userLogged.service';
import { SignUpCompanyDialog } from './dialogs/signUpCompany.dialog';

@Component({
    selector: 'auth-sign-up',
    templateUrl: './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class AuthSignUpComponent implements OnInit {
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    public formGroup: FormGroup;
    showAlert: boolean = false;

    constructor(
        private readonly _apiService: ApiService,
        private readonly _formBuilder: FormBuilder,
        private readonly _userLoggedService: UserLoggedService,
        private readonly _router: Router,
        private readonly _dialogService: DialogService,
        private readonly _authService: SocialAuthService,
        protected _dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.formGroup = this._formBuilder.group({
            nome: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            senha: ['', Validators.required],
            razaoSocial: ['', Validators.required],
            cpfCnpj: ['', Validators.required],
        });
    }

    signUp(): void {
        // @TODO IMPLEMENTAR LOADING
        if (this.formGroup.valid) {
            this.showAlert = false;
            this._apiService
                .signUp(this.convertModel(this.formGroup.value))
                .subscribe((response) => {
                    if (response) {
                        this._userLoggedService.set(response);
                        this._router.navigateByUrl('/signed-in-redirect');
                    } else {
                        this.alert = {
                            type: 'error',
                            message:
                                'Ocorreu um erro ao efetuar o cadastro, tente novamente!',
                        };
                        this.showAlert = true;
                    }
                });
        } else {
            this.alert = {
                type: 'error',
                message:
                    'Por favor, verifique o preenchimento de todos os campos!',
            };
            this.showAlert = true;
        }
    }

    async authenticate(auth: String): Promise<void> {
        try {
            const response = await this._authService.signIn(
                GoogleLoginProvider.PROVIDER_ID
            );

            if (response) {
                this._dialog
                    .open(SignUpCompanyDialog, {
                        autoFocus: true,
                        disableClose: true,
                        width: '95vw',
                        maxHeight: '95vh',
                        data: {
                            responseAuth: response,
                        },
                    })
                    .afterClosed()
                    .subscribe((res) => {
                        if (!res) return;

                        this._apiService
                            .signUp(this.convertModel(res))
                            .subscribe(
                                (response) => {
                                    this._userLoggedService.set(response);
                                    this._router.navigateByUrl(
                                        '/signed-in-redirect'
                                    );
                                    this.showAlert = true;
                                },
                                (err) => {
                                    this._userLoggedService.set(null);
                                    this.alert = {
                                        type: 'error',
                                        message:
                                            'Ocorreu um erro, favor tentar novamente!',
                                    };

                                    this.showAlert = true;
                                }
                            );
                    });
            }
        } catch (e) {
            this._userLoggedService.set(null);
            this.alert = {
                type: 'error',
                message:
                    'Ocorreu um erro ao efetuar o cadastro, tente novamente!',
            };
            this.showAlert = true;
        }
    }

    convertModel(objeto): any {
        const newObj: any = {
            ...objeto,
            empresa: {
                cpfCnpj: objeto.cpfCnpj,
                razaoSocial: objeto.razaoSocial,
            },
        };

        delete newObj.razaoSocial;
        delete newObj.cpfCnpj;

        return newObj;
    }

    desconvertForm(objeto): any {
        return objeto;
    }
}
