import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuseAlertType } from '../../../../../@fuse/components/alert/alert.types';

@Component({
    selector: 'filter-client-dialog',
    templateUrl: './filter-client.dialog.html',
    styleUrls: ['./filter-client.dialog.scss'],
})
export class FilterClientDialog {
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    showAlert: boolean = false;

    client: any = null;
    service: any = null;

    constructor(
        public readonly dialogRef: MatDialogRef<FilterClientDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit() {
    }

    close() {
        this.dialogRef.close();
    }

    salvar() {
        if (this.client || this.service) {
            this.dialogRef.close({
                client: this.client ? this.client.id : null,
                service: this.service ? this.service.id : null
            });
        } else {
            this.dialogRef.close();
        }
    }
}
