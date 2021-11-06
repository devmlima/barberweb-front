import { DialogService } from './../../../../../@fuse/services/dialogs/dialog.service';
import { Router } from '@angular/router';
import { ApiService } from './../../../../api/services/api.service';
import { FuseAlertType } from './../../../../../@fuse/components/alert/alert.types';
import { fuseAnimations } from './../../../../../@fuse/animations/public-api';
import {
    Component,
    ViewEncapsulation,
    OnInit,
    ChangeDetectorRef,
    ViewChild,
} from '@angular/core';
import { MatTable } from '@angular/material/table';

export interface ScheduleModel {
    nome: string;
    email: string;
}

@Component({
    selector: 'schedule-list',
    templateUrl: './schedule-list.component.html',
    styleUrls: ['./schedule-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class ScheduleListComponent implements OnInit {
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    showAlert: boolean = false;
    dataSource: any = [];
    displayedColumns: string[] = ['servicoId', 'clienteId', 'hora', 'confirmado', 'cancelado', 'actions'];

    rota = 'operations/schedule';
    widthScreen = window.screen.width;

    @ViewChild(MatTable) table: MatTable<ScheduleModel>;

    constructor(
        private readonly _api: ApiService,
        private readonly router: Router,
        private readonly dc: ChangeDetectorRef,
        private readonly dialogService: DialogService
    ) {}

    ngOnInit(): void {
        this.loadingRows();
    }

    loadingRows(): void {
        this._api.scheduleFindAll().subscribe((res) => {
            this.dataSource = res;
        });
    }

    newForm(): void {
        this.router.navigate([`${this.rota}/form`]);
    }

    editRow(row): void {
        this.router.navigate([`${this.rota}/form`, { id: row.id }]);
    }

    deleteRow(row) {
        let width = null;

        if (+this.widthScreen < 450) {
            width = '265px;';
        }

        this.dialogService
            .confirm(
                'Com essa ação, o agendamento será removido, permanentemente!',
                'Remover agendamento',
                true,
                { btnOkText: 'Remover', width }
            )
            .then((res) => {
                if (res) {
                    this._api.deleteSchedule(row.id).subscribe(
                        (res) => {
                            this.loadingRows();
                            this.dc.detectChanges();

                            this.alert = {
                                type: 'success',
                                message: 'Registro removido com sucesso',
                            };
                        },
                        (err) => {
                            this.alert = {
                                type: 'error',
                                message: 'Ocorreu um erro, tente novamente!',
                            };
                        }
                    );
                }
            });
    }
}
