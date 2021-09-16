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
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
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
        // @TODO COMEÇAR A IMPLEMENTAR AQUI
        if (this.formGroup.valid) {
            this.showAlert = false;
            this._authService.signUp(this.formGroup.value).subscribe(
                (response) => {
                    this.formGroup.enable();
                    this.formGroup.reset();
                    this.alert = {
                        type: 'error',
                        message: 'Alguma coisa deu errado. Por favor tente outra vez.',
                    };
                    this.showAlert = true;
                }
            );
        } else {
            this.alert = {
                type: 'error',
                message: 'Por favor, verifique o preenchimento de todos os campos!',
            };
            this.showAlert = true;
        }
    }
}
