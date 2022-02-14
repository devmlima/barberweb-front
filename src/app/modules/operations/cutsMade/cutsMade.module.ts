import { CutsMadeFormComponent } from './form/cutsMade-form.component';
import { CutsMadeListComponent } from './list/cutsMade-list.component';
import { cutsMadeRoutes } from './cutsMade.routing';
import { CustomsSelectModule } from './../../../customs-select/customs-select.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from './../../../shared/shared.module';
import { DialogsModule } from '@fuse/services/dialogs/dialogs.module';

@NgModule({
    declarations: [
        CutsMadeListComponent,
        CutsMadeFormComponent
    ],
    imports: [
        CustomsSelectModule,

        RouterModule.forChild(cutsMadeRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        SharedModule,
        DialogsModule,
    ],
})
export class CutsMadeModule {}
