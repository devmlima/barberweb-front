import { FuseAlertType } from './../../../../@fuse/components/alert/alert.types';
import { fuseAnimations } from './../../../../@fuse/animations/public-api';

import { Component, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
    selector: 'dashboard-principal',
    templateUrl: './dashboard-principal.component.html',
    styleUrls: ['./dashboard-principal.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class DashboardPrincipalComponent implements OnInit {
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    showAlert: boolean = false;

    constructor() {}

    ngOnInit(): void {
        console.log('to na dash')
    }
}
