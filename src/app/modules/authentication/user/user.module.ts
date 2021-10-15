import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FuseCardModule } from './../../../../@fuse/components/card/card.module';
import { FuseAlertModule } from './../../../../@fuse/components/alert/alert.module';

import { SharedModule } from './../../../shared/shared.module';

import { userRoutes } from './user.routing';
import { UserListComponent } from './list/user-list.component';

@NgModule({
    declarations: [
        UserListComponent
    ],
    imports: [
        RouterModule.forChild(userRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        FuseCardModule,
        FuseAlertModule,
        SharedModule,
    ],
})
export class UserModule {}
