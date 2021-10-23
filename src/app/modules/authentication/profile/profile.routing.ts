import { ProfileListComponent } from './list/profile-list.component';
import { ProfileFormComponent } from './form/profile-form.component';

import { Route } from '@angular/router';

export const profileRoutes: Route[] = [
    {
        path: '',
        component: ProfileListComponent,
    },
    {
        path: 'form',
        component: ProfileFormComponent,
    },
];
