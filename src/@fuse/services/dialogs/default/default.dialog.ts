import { Component, OnInit, Inject, HostBinding } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { DialogInputFormat } from '../dialog.service';
import { ViewChild } from '@angular/core';
import { HostListener } from '@angular/core';
import * as $ from 'jquery';
import { MatButton } from '@angular/material/button';
import { each } from 'lodash-es';

/**
 * This component renders the contacts submodule.
 *
 * On the left is the list of contacts.
 * On the right is the ui-view viewport where contact details appear.
 */
@Component({
    templateUrl: './default.dialog.html',
    styleUrls: ['./default.dialog.scss']
})
export class DefaultDialog implements OnInit {

    title: string;
    message: string;
    type: DialogType;
    btnCancelText = 'Cancelar';
    btnOkText = 'Ok';
    placeholder = '';
    hideCloseButton = false;
    inputFormat: DialogInputFormat;
    focusConfirmar: boolean;

    inputControl: FormControl;

    enumDialogType = DialogType;

    @ViewChild('butConfimar', { static: false }) butConfimar: MatButton;
    @ViewChild('butCancelar', { static: false }) butCancelar: MatButton;
    @HostBinding('class') classList = '';

    arrNavBotoes: string[] = ['butCancelar', 'butConfirmar'];

    constructor(
        public dialogRef: MatDialogRef<DefaultDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    onNoClick(): void {
        this.cancel()
    }

    ngOnInit(): void {
        each(this.data, (value, key) => {
            this[key] = value;
        });
        if (this.type === DialogType.Input) {
            this.inputControl = new FormControl('', [
                Validators.required
            ]);
        } else {
            this.dialogRef.afterOpened().subscribe(() => {
                setTimeout(() => {
                    this.butConfimar.focus();
                }, 100);
            });
        }
    }

    getClass(): string {
        switch (this.type) {
            case DialogType.Input:
            case DialogType.Alert:
            case DialogType.Confirm:
                return;
            case DialogType.Error:
                this.classList = 'error';
        }
    }

    ok(): void {
        if (this.type === DialogType.Input) {
            if (this.inputControl.valid) {
                this.dialogRef.close(this.inputControl.value);
            }
        } else {
            this.dialogRef.close(true);
        }
    }

    cancel(): void {
        this.dialogRef.close(false);
    }

    @HostListener('window:keydown', ['$event'])
    keyboardInput(event: KeyboardEvent): void {
        if (this.type !== DialogType.Confirm) {
            return;
        }
        const target = $(event.target);
        const targetId: string = target.attr('id') || target.prop('tagName').toLowerCase();
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            if (targetId === 'butCancelar') {
                this.butConfimar.focus();
            } else {
                this.butCancelar.focus();
            }
        }
    }

}

export enum DialogType {
    Alert,
    Error,
    Confirm,
    Input
}
