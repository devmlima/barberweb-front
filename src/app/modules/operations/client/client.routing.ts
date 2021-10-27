import { ClientFormComponent } from './form/client-form.component';
import { ClientListComponent } from './list/client-list.component';

import { Route } from '@angular/router';

export const clientRoutes: Route[] = [
    {
        path: '',
        component: ClientListComponent,
    },
    {
        path: 'form',
        component: ClientFormComponent,
    },
];
