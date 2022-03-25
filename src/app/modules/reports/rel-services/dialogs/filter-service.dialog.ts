import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuseAlertType } from '../../../../../@fuse/components/alert/alert.types';

@Component({
    selector: 'filter-service-dialog',
    templateUrl: './filter-service.dialog.html',
    styleUrls: ['./filter-service.dialog.scss'],
})
export class FilterServiceDialog {
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    showAlert: boolean = false;

    service: any = null;

    constructor(
        public readonly dialogRef: MatDialogRef<FilterServiceDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit() {
    }

    close() {
        this.dialogRef.close();
    }

    salvar() {
        if (this.service) {
            this.dialogRef.close({
                service: this.service ? this.service.id : null
            });
        } else {
            this.dialogRef.close();
        }
    }
}
