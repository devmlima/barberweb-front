import { CutsMadeFormComponent } from './form/cutsMade-form.component';
import { CutsMadeListComponent } from './list/cutsMade-list.component';
import { Route } from '@angular/router';

export const cutsMadeRoutes: Route[] = [
    {
        path: '',
        component: CutsMadeListComponent,
    },
    {
        path: 'form',
        component: CutsMadeFormComponent,
    },
];
