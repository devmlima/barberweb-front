import { UserLoggedService } from './../../../api/services/userLogged.service';
/* eslint-disable no-debugger */
import { ApiService } from './../../../api/services/api.service';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';

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
        private _apiService: ApiService,
        private _formBuilder: FormBuilder,
        private readonly _userLoggedService: UserLoggedService,
        private _router: Router
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
