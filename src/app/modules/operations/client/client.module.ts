import { CustomsSelectModule } from './../../../customs-select/customs-select.module';
import { ClientFormComponent } from './form/client-form.component';
import { ClientListComponent } from './list/client-list.component';
import { clientRoutes } from './client.routing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DialogsModule } from '@fuse/services/dialogs/dialogs.module';

import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    declarations: [
        ClientListComponent,
        ClientFormComponent,
    ],
    imports: [
        CustomsSelectModule,

        RouterModule.forChild(clientRoutes),
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
export class ClientModule {}
