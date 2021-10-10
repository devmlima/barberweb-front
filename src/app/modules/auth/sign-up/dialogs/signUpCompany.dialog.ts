import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'sign-up-company-dialog',
    templateUrl: './signUpCompany.dialog.html',
    styleUrls: ['./signUpCompany.dialog.scss'],
})
export class SignUpCompanyDialog {
    constructor(
        public readonly dialogRef: MatDialogRef<SignUpCompanyDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit() {}
}
