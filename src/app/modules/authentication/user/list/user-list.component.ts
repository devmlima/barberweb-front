import { Router } from '@angular/router';
import { ApiService } from './../../../../api/services/api.service';
import { FuseAlertType } from './../../../../../@fuse/components/alert/alert.types';
import { fuseAnimations } from './../../../../../@fuse/animations/public-api';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
    selector: 'user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class UserListComponent implements OnInit {
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    showAlert: boolean = false;
    dataSource: any = [];
    displayedColumns: string[] = ['name', 'email', 'profile', 'actions'];

    rota = 'authentication/user';

    constructor(
        private readonly _api: ApiService,
        private readonly router: Router
    ) {}

    ngOnInit(): void {
        this._api.getUsers().subscribe((res) => {
            this.dataSource = res;
        });
    }

    navigation() {
        this.router.navigate([`${this.rota}/form`]);
    }
}
