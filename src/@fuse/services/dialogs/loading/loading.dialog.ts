import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * This component renders the contacts submodule.
 *
 * On the left is the list of contacts.
 * On the right is the ui-view viewport where contact details appear.
 */
@Component({
    templateUrl: './loading.dialog.html',
    styleUrls: ['./loading.dialog.scss']
})
export class LoadingDialog implements OnInit {

    mensagem: string;

    constructor(
        public dialogRef: MatDialogRef<LoadingDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    onNoClick(): void {
        this.cancel();
    }

    cancel() {
        this.dialogRef.close(false);
    }

    ngOnInit(): void {
        this.mensagem = this.data.mensagem || "Aguarde...";
    }

}