/* eslint-disable no-debugger */
import { UserLoggedService } from './../../../api/services/userLogged.service';
import { ApiService } from './../../../api/services/api.service';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';

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

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _apiService: ApiService,
        private _userLoggedService: UserLoggedService,
        private _formBuilder: FormBuilder,
        private _router: Router
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.signInForm = this._formBuilder.group({
            email: [
                '',
                [Validators.required, Validators.email],
            ],
            senha: ['', Validators.required],
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    signIn(): void {
        if (this.signInForm.invalid) {
            return;
        }

        this.signInForm.disable();
        this.showAlert = false;

        this._apiService.login(this.signInForm.value).subscribe(
            (response) => {
                debugger;
                this._userLoggedService.set(response);
                const redirectURL =
                    this._activatedRoute.snapshot.queryParamMap.get(
                        'redirectURL'
                    ) || '/signed-in-redirect';
                this._router.navigateByUrl(redirectURL);
            },
            (err) => {
                debugger;
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
