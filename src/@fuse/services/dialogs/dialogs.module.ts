import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { DialogService } from './dialog.service';
import { DefaultDialog } from './default/default.dialog';
import { LoadingDialog } from './loading/loading.dialog';

@NgModule({
    declarations: [
        DefaultDialog,
        LoadingDialog
    ],
    entryComponents: [
        DefaultDialog,
        LoadingDialog
    ],
    imports: [
        MatTableModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatAutocompleteModule,
        CommonModule,
        MatDatepickerModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatProgressSpinnerModule
    ],
    providers: [
        DialogService
    ]
})
export class DialogsModule { }
