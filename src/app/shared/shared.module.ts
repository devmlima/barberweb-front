import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseCardModule } from './../../@fuse/components/card/card.module';
import { FuseAlertModule } from './../../@fuse/components/alert/alert.module';

import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';

import { ApiService } from './../api/services/api.service';

import { AuthGuard } from './../core/auth/guards/auth.guard';

import { LocalStorageModule } from 'angular-2-local-storage';

import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        LocalStorageModule.forRoot({
            prefix: 'barber-web',
            storageType: 'localStorage',
        }),
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatMenuModule,
        MatRadioModule,
        MatSelectModule,
        MatStepperModule,
        MatDialogModule,
        MatTooltipModule,
        MatSnackBarModule,

        FuseCardModule,
        FuseAlertModule,
    ],
    providers: [AuthGuard, ApiService, { provide: LOCALE_ID, useValue: 'pt' }],
})
export class SharedModule {}
