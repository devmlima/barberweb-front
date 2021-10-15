import { UserListComponent } from './list/user-list.component';
import { Route } from '@angular/router';

export const userRoutes: Route[] = [
    {
        path: '',
        component: UserListComponent,
    },
    {
        path: 'form',
        // component: meu component de form aqui
    },
];
