import { CustomsSelectModule } from './../../../customs-select/customs-select.module';
import { ScheduleFormComponent } from './form/schedule-form.component';
import { ScheduleListComponent } from './list/schedule-list.component';
import { scheduleRoutes } from './schedule.routing';
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
        ScheduleListComponent,
        ScheduleFormComponent
    ],
    imports: [
        CustomsSelectModule,

        RouterModule.forChild(scheduleRoutes),
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
export class ScheduleModule {}
