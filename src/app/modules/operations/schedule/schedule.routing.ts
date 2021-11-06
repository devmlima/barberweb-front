import { ScheduleFormComponent } from './form/schedule-form.component';
import { ScheduleListComponent } from './list/schedule-list.component';
import { Route } from '@angular/router';

export const scheduleRoutes: Route[] = [
    {
        path: '',
        component: ScheduleListComponent,
    },
    {
        path: 'form',
        component: ScheduleFormComponent, 
    },
];
