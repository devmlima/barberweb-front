import { ServiceFormComponent } from './form/service-form.component';
import { serviceRoutes } from './service.routing';
import { ServiceListComponent } from './list/service-list.component';
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
        ServiceListComponent,
        ServiceFormComponent,
    ],
    imports: [
        RouterModule.forChild(serviceRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        SharedModule,
        DialogsModule
    ],
})
export class ServiceModule {}
