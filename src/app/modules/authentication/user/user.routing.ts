import { UserFormComponent } from './form/user-form.component';
import { UserListComponent } from './list/user-list.component';
import { Route } from '@angular/router';

export const userRoutes: Route[] = [
    {
        path: '',
        component: UserListComponent,
    },
    {
        path: 'form',
        component: UserFormComponent
    },
];
