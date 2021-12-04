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

import { userRoutes } from './user.routing';
import { UserListComponent } from './list/user-list.component';
import { UserFormComponent } from './form/user-form.component';
import { DialogsModule } from '@fuse/services/dialogs/dialogs.module';

@NgModule({
    declarations: [
        UserListComponent,
        UserFormComponent
    ],
    imports: [
        RouterModule.forChild(userRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        SharedModule,
        DialogsModule,
        CustomsSelectModule,
    ],
})
export class UserModule {}
