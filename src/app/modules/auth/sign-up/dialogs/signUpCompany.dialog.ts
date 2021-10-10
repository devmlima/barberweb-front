import { FuseAlertType } from './../../../../../@fuse/components/alert/alert.types';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'sign-up-company-dialog',
    templateUrl: './signUpCompany.dialog.html',
    styleUrls: ['./signUpCompany.dialog.scss'],
})
export class SignUpCompanyDialog {
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    public formGroup: FormGroup;
    showAlert: boolean = false;

    constructor(
        public readonly dialogRef: MatDialogRef<SignUpCompanyDialog>,
        private readonly _formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit() {
        this.formGroup = this._formBuilder.group({
            razaoSocial: ['', Validators.required],
            cpfCnpj: ['', Validators.required],
        });
    }

    close() {
        this.dialogRef.close();
    }

    salvar() {

        if (this.formGroup.valid) {
            const objectSocial = {
                nome: this.data.responseAuth.name,
                email: this.data.responseAuth.email,
                image: this.data.responseAuth.photoUrl,
                provider: this.data.responseAuth.provider
            }
            const object = Object.assign(
                {},
                objectSocial,
                this.formGroup.value
            );

            this.dialogRef.close(object);
        } else {
            this.alert = {
                type: 'error',
                message:
                    'Por favor, verifique o preenchimento de todos os campos!',
            };
            this.showAlert = true;
        }
    }
}
