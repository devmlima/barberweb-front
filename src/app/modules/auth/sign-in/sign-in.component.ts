import { UserLoggedService } from './../../../api/services/userLogged.service';
import { ApiService } from './../../../api/services/api.service';

import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { FuseAlertType } from '@fuse/components/alert';
import { fuseAnimations } from '@fuse/animations';

import { SocialAuthService, GoogleLoginProvider } from 'angularx-social-login';

@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class AuthSignInComponent implements OnInit {
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    signInForm: FormGroup;
    showAlert: boolean = false;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _apiService: ApiService,
        private _userLoggedService: UserLoggedService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _authService: SocialAuthService
    ) {}

    ngOnInit(): void {
        this.signInForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            senha: ['', Validators.required],
        });
    }

    signIn(): void {
        if (this.signInForm.invalid) {
            return;
        }

        this.signInForm.disable();
        this.showAlert = false;

        this._apiService.login(this.signInForm.value).subscribe(
            (response) => {
                this._userLoggedService.set(response);
                const redirectURL =
                    this._activatedRoute.snapshot.queryParamMap.get(
                        'redirectURL'
                    ) || '/signed-in-redirect';
                this._router.navigateByUrl(redirectURL);
            },
            (err) => {
                this._userLoggedService.set(null);
                this.signInForm.enable();
                this.signInNgForm.resetForm();

                this.alert = {
                    type: 'error',
                    message:
                        'Email ou senha incorretos, favor tentar novamente!',
                };

                this.showAlert = true;
            }
        );
    }

    async authenticate(): Promise<void> {
        const response = await this._authService.signIn(
            GoogleLoginProvider.PROVIDER_ID
        );

        this._apiService.login({email: response.email, provider: 'GOOGLE'}).subscribe(
            (res) => {
                this._userLoggedService.set(res);
                const redirectURL =
                    this._activatedRoute.snapshot.queryParamMap.get(
                        'redirectURL'
                    ) || '/signed-in-redirect';
                this._router.navigateByUrl(redirectURL);
            },
            (err) => {
                this._userLoggedService.set(null);
                this.signInForm.enable();
                this.signInNgForm.resetForm();

                this.alert = {
                    type: 'error',
                    message:
                        'Email ou senha incorretos, favor tentar novamente!',
                };

                this.showAlert = true;
            }
        );
    }
}
