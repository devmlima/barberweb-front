import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { DefaultDialog, DialogType } from './default/default.dialog';
import { LoadingDialog } from './loading/loading.dialog';
import { get } from 'lodash-es';

@Injectable()
export class DialogService {

    public static ultimoDialog: MatDialogRef<any>;
    public static dialogAberto = false;

    private filaDialogs: Array<MatDialogRef<any>> = new Array<MatDialogRef<any>>();


    // Exemplo de injeção de servicos
    constructor(
        private _dialog: MatDialog,
        private snackbar: MatSnackBar
    ) {
        this._dialog.afterAllClosed.subscribe(() => {
            DialogService.dialogAberto = false;
            DialogService.ultimoDialog = null;
        });
        this._dialog.afterOpened.subscribe((dialog: MatDialogRef<any>) => {
            this.filaDialogs.push(dialog);
            DialogService.ultimoDialog = dialog;
            dialog.afterClosed().subscribe(() => {
                this.filaDialogs.pop();
                DialogService.ultimoDialog = this.filaDialogs[this.filaDialogs.length - 1];
            });
            DialogService.dialogAberto = true;
        });
    }

    public static fechaDialogAberto(): void {
        if (this.ultimoDialog) {
            this.ultimoDialog.close();
        }
    }

    public showToast(msg, action?, position = 'right', duration = 6000): void {
        this.snackbar.open(msg, action, {
            horizontalPosition: position as MatSnackBarHorizontalPosition,
            duration: duration
        });
    }

    protected default(options: DialogParams, dialogConfig: MatDialogConfig = {}): Promise<any> {
        return new Promise((resolve, reject) => {
            dialogConfig.data = options;
            dialogConfig.minWidth = dialogConfig.minWidth = '300px';
            dialogConfig.disableClose = true;
            dialogConfig.panelClass = 'dialog-default';
            const dialogRef = this._dialog.open(DefaultDialog, dialogConfig);
            dialogRef.afterClosed().subscribe(result => {
                resolve(result);
            }, reject);
        });
    }

    public alert(message: string, title: string = 'Alerta!', dialogConfig: DialogParams = {}): Promise<any> {
        dialogConfig.title = title;
        dialogConfig.message = message;
        dialogConfig.type = DialogType.Alert;
        return this.default(dialogConfig).then(() => {
            return Promise.resolve(true);
        }).catch((err) => {
            if (err) {
                return Promise.reject(err);
            }
            return Promise.resolve(false);
        });
    }

    public confirm(message: string, title: string = 'Confirmar!', focusConfirmar: boolean = false, dialogConfig: DialogParams = {}): Promise<any> {
        dialogConfig.title = title;
        dialogConfig.message = message;
        dialogConfig.focusConfirmar = focusConfirmar;
        dialogConfig.type = DialogType.Confirm;
        return this.default(dialogConfig);
    }

    public error(message: any, title: string = 'Erro!', dialogConfig: DialogParams = {}): Promise<any> {
        if (typeof message === 'object') {
            message = get(message, 'error.message', null) || get(message, 'message', message) || get(message, 'error.error', null) || get(message, 'error', null);
        }
        if (typeof message == 'object') {
            message = 'Por favor verifique sua conexão com a internet!';
        }
        dialogConfig.title = title;
        dialogConfig.message = message;
        dialogConfig.type = DialogType.Error;
        return this.default(dialogConfig);
    }

    public input<T>(message: string, title: string = 'Preencha o campo abaixo!', inputFormat: DialogInputFormat = DialogInputFormat.Text, placeholder: string = ''): Promise<T> {
        return this.default({
            title: title,
            message: message,
            placeholder: placeholder,
            type: DialogType.Input,
            inputFormat: inputFormat
        });
    }

    public errorPromise(error: Error): Promise<any> {
        if (error) {
            return this.error(get(error, 'error.error.message') || error.message);
        } else {
            return null;
        }
    }

    public loading(mensagem?: string): MatDialogRef<LoadingDialog> {
        const dialogRef = this._dialog.open(LoadingDialog, {
            autoFocus: true,
            disableClose: true,
            data: {
                mensagem: mensagem
            }
        });
        return dialogRef;
    }

}

export interface DialogParams {
    title?: string;
    message?: string;
    type?: DialogType;
    btnCancelText?: string;
    btnOkText?: string;
    hideCloseButton?: boolean;
    placeholder?: string;
    inputFormat?: DialogInputFormat;
    focusConfirmar?: boolean;
}

export enum DialogInputFormat {
    Text = 'text',
    Number = 'number'
}
