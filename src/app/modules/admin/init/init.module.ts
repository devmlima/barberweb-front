import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { InitComponent } from 'app/modules/admin/init/init.component';

const initRoutes: Route[] = [
    {
        path     : '',
        component: InitComponent
    }
];

@NgModule({
    declarations: [
        InitComponent
    ],
    imports     : [
        RouterModule.forChild(initRoutes)
    ]
})
export class InitModule
{
}
