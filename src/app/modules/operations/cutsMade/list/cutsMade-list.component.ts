import {
    ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation
} from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { get } from 'lodash-es';
import { fuseAnimations } from './../../../../../@fuse/animations/public-api';
import { FuseAlertType } from './../../../../../@fuse/components/alert/alert.types';
import { DialogService } from './../../../../../@fuse/services/dialogs/dialog.service';
import { ApiService } from './../../../../api/services/api.service';

export interface CutsMadeModel {
    nome: string;
    email: string;
}

@Component({
    selector: 'cutsMade-list',
    templateUrl: './cutsMade-list.component.html',
    styleUrls: ['./cutsMade-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class CutsMadeListComponent implements OnInit {
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    loading: boolean = true;
    showAlert: boolean = false;
    dataSource: any = [];
    displayedColumns: string[] = ['servicoId', 'clienteId', 'usuarioId', 'data', 'hora', 'valor', 'confirmado', 'cancelado', 'actions'];

    rota = 'operations/cutsMade';
    widthScreen = window.screen.width;

    @ViewChild(MatTable) table: MatTable<CutsMadeModel>;

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
        this._api.cutsMadeFindAll().subscribe((res) => {
            this.dataSource = res;
            this.loading = false;
        });
    }

    newForm(): void {
        this.router.navigate([`${this.rota}/form`]);
    }


    print(row): void {
        let width = null;

        if (+this.widthScreen < 450) {
            width = '265px;';
        }

        this.dialogService
            .confirm(
                'Tem certeza que deseja deseja imprimir este comprovante?',
                'Imprimir comprovante',
                true,
                { btnOkText: 'SIM', width }
            )
            .then((res) => {
                if (res) {
                    this.loading = true;
                    const day = row.data.split('/')[0];
                    const month = this.renderMonth(row.data.split('/')[1])
                    const year = row.data.split('/')[2];

                    const data = {
                        date: `${day} ${month} ${year}, ${row.hora}`,
                        valor: `R$ ${row.valor.replace('.', ',')}`,
                        pagador: String(row.client.nome).toUpperCase(),
                        servico: String(row.service.descricao).toUpperCase()
                    };

                    this._api.print(data).subscribe(res => {
                        this.loading = false;
                        if (res) {
                            window.open(res, '_blank');
                        }
                    });
                }
            });

    }

    renderMonth(month) {
        switch (+month) {
            case 1:
                return 'JAN';
            case 2:
                return 'FEV';
            case 3:
                return 'MAR';
            case 4:
                return 'ABR';
            case 5:
                return 'MAI';
            case 6:
                return 'JUN';
            case 7:
                return 'JUL';
            case 8:
                return 'AGO';
            case 9:
                return 'SET';
            case 10:
                return 'OUT';
            case 11:
                return 'NOV';
            case 12:
                return 'DEZ';
            default:
                return 'JAN'
        }
    }

    getElement(type: string, element: any): string {
        switch (type) {
            case 'confirmado':
                // o contrário do que cancelado, então é dessa forma mesmo
                return element ? 'NÃO' : 'SIM';
            case 'cancelado':
                return element ? 'SIM' : 'NÃO';
            case 'servico':
                return get(element, 'descricao', 'Serviço não informado');
            case 'cliente':
                return get(element, 'nome', 'Cliente não informado');
            case 'usuario':
                return get(element, 'nome', 'Colaborador não informado');
            case 'valor':
                if (!element) {
                    return '';
                }

                return `R$ ${String(element).replace('.', ',')}`
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
                'Com essa ação, o realizado será removido, permanentemente!',
                'Remover realizado',
                true,
                { btnOkText: 'Remover', width }
            )
            .then((res) => {
                if (res) {
                    this.loading = true;
                    this._api.deletecutsMade(row.id).subscribe(
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
                    this._api.updatecutsMade(obj).subscribe(
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
