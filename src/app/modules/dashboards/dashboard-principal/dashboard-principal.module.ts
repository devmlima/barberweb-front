import { DashboardPrincipalComponent } from './dashboard-principal.component';
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
import { dashboardRoutes } from './dashboard-principal.routing';

@NgModule({
    declarations: [
        DashboardPrincipalComponent
    ],
    imports: [
        RouterModule.forChild(dashboardRoutes),
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
export class DashboardModule {}
