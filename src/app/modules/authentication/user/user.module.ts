import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from './../../../shared/shared.module';

import { userRoutes } from './user.routing';
import { UserListComponent } from './list/user-list.component';

@NgModule({
    declarations: [
        UserListComponent
    ],
    imports: [
        RouterModule.forChild(userRoutes),
        SharedModule,
    ],
})
export class UserModule {}
