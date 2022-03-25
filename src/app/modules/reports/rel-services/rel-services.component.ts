import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { fuseAnimations } from '../../../../@fuse/animations/public-api';
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
    dataSource = [
        {
            servico: 'Corte + Barba',
            totalClientes: 6,
            total: 'R$ 470,00'
        },
        {
            servico: 'Corte + Barba + Pintura',
            totalClientes: 3,
            total: 'R$ 195,00'
        },
        {
            servico: 'Corte + Barba + Sobrancelha',
            totalClientes: 4,
            total: 'R$ 280,00'
        },
        {
            servico: 'Totais',
            totalClientes: 13,
            total: 'R$ 1045,00'
        },
    ];

    @ViewChild(MatTable) table: MatTable<any>;

    constructor(
        protected _dialog: MatDialog,
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
                console.log(res);
            }
            );
    }

    search(): void {
    }
}
