import { ServiceFormComponent } from './form/service-form.component';
import { ServiceListComponent } from './list/service-list.component';

import { Route } from '@angular/router';

export const serviceRoutes: Route[] = [
    {
        path: '',
        component: ServiceListComponent,
    },
    {
        path: 'form',
        component: ServiceFormComponent,
    },
];
