import { get } from 'lodash-es';
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
    loading: boolean = true;
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
    ) { }

    ngOnInit(): void {
        this.loadingRows();
    }

    loadingRows(): void {
        this._api.scheduleFindAll().subscribe((res) => {
            this.dataSource = res;
            this.loading = false;
        });
    }

    newForm(): void {
        this.router.navigate([`${this.rota}/form`]);
    }

    getElement(type: string, element: any): string {
        switch (type) {
            case 'confirmado':
                return element ? 'SIM' : 'NÃO';
            case 'cancelado':
                return element ? 'SIM' : 'NÃO';
            case 'servico':
                return get(element, 'descricao', 'Serviço não informado');
            case 'cliente':
                return get(element, 'nome', 'Cliente não informado');
            default:
                return '';
        }
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
                    this.loading = true;
                    this._api.deleteSchedule(row.id).subscribe(
                        (res) => {
                            this.loadingRows();
                            this.dc.detectChanges();
                            this.loading = false;

                            this.alert = {
                                type: 'success',
                                message: 'Registro removido com sucesso',
                            };
                            this.showAlert = true;
                        },
                        (err) => {
                            this.loading = false;
                            this.alert = {
                                type: 'error',
                                message: err,
                            };
                            this.showAlert = true;
                        }
                    );
                }
            });
    }

    cancelRow(row) {
        let width = null;

        if (+this.widthScreen < 450) {
            width = '265px;';
        }

        const obj = {
            cancelado: true,
            confirmado: false,
            id: row.id
        };

        this.dialogService
            .confirm(
                'Com essa ação, o agendamento será cancelado, permanentemente!',
                'Cancelar agendamento',
                true,
                { btnOkText: 'Cancelar Agendamento', btnCancelText: 'Voltar', width }
            ).then(r => {
                if (r) {
                    this._api.updateSchedule(obj).subscribe(
                        (res) => {
                            this.loadingRows();
                            this.dc.detectChanges();

                            this.alert = {
                                type: 'success',
                                message: 'Agendamento cancelado com sucesso',
                            };
                            this.showAlert = true;
                        },
                        (err) => {
                            this.alert = {
                                type: 'error',
                                message: err,
                            };
                            this.showAlert = true;
                        }
                    );
                }
            });
    }

    getClass(row): string {
        return row.cancelado ? 'canceled' : '';
    }
}
