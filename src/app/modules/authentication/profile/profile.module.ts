import { FuseAlertModule } from '@fuse/components/alert';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DialogsModule } from '@fuse/services/dialogs/dialogs.module';

import { SharedModule } from './../../../shared/shared.module';
import { profileRoutes } from './profile.routing';
import { ProfileListComponent } from './list/profile-list.component';
import { ProfileFormComponent } from './form/profile-form.component';

@NgModule({
    declarations: [
        ProfileListComponent,
        ProfileFormComponent
    ],
    imports: [
        RouterModule.forChild(profileRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        SharedModule,
        DialogsModule,
        FuseAlertModule
    ],
})
export class ProfileModule {}
