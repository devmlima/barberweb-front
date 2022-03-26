import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { fuseAnimations } from './../../../../@fuse/animations/public-api';
import { ApiService } from './../../../api/services/api.service';
import { FilterClientDialog } from './dialogs/filter-client.dialog';

@Component({
    selector: 'rel-client',
    templateUrl: './rel-client.component.html',
    styleUrls: ['./rel-client.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class RelClientComponent implements OnInit {
    loading = false;
    displayedColumns: string[] = ['cliente', 'servico', 'data', 'total'];
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
            .open(FilterClientDialog, {
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
        this._api.relClient(query).subscribe(res => {
            this.loading = false;
            this.dataSource = res;
        })
    }
}
