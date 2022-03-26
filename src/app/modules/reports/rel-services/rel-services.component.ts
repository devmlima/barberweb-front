import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { fuseAnimations } from '../../../../@fuse/animations/public-api';
import { ApiService } from './../../../api/services/api.service';
import { FilterServiceDialog } from './dialogs/filter-service.dialog';

@Component({
    selector: 'rel-services',
    templateUrl: './rel-services.component.html',
    styleUrls: ['./rel-services.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class RelServicesComponent implements OnInit {
    loading = false;
    displayedColumns: string[] = ['servico', 'totalClientes', 'total'];
    dataSource = [];

    @ViewChild(MatTable) table: MatTable<any>;

    constructor(
        protected _dialog: MatDialog,
        private readonly _api: ApiService,
    ) { }

    ngOnInit(): void {
    }

    openFilter(): void {
        this._dialog
            .open(FilterServiceDialog, {
                autoFocus: true,
                disableClose: true,
                width: '60vw',
                maxHeight: '120vh',
            })
            .afterClosed()
            .subscribe((res) => {
                this.search(res);
            }
            );
    }

    search(query = null): void {
        this.loading = true;
        this._api.relServices(query).subscribe(res => {
            this.loading = false;
            this.dataSource = res;
        })
    }
}
