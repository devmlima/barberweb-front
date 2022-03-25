import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { fuseAnimations } from './../../../../@fuse/animations/public-api';
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
    dataSource = [
        {
            cliente: 'Lucio',
            servico: 'Corte + Barba',
            data: '25/03/2022',
            total: 'R$ 470,00'
        },
        {
            cliente: 'Jorge',
            servico: 'Corte + Barba',
            data: '17/03/2022',
            total: 'R$ 100,00'
        },
        {
            cliente: 'Jhon',
            servico: 'Corte + Barba + Pintura',
            data: '17/03/2022',
            total: 'R$ 195,00'
        },
        {
            cliente: 'Roberto',
            servico: 'Corte + Barba + Sobrancelha',
            data: '25/03/2022',
            total: 'R$ 280,00'
        },
        {
            cliente: 'Totais',
            servico: '-',
            data: '-',
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
            .open(FilterClientDialog, {
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
