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

export interface ClientModel {
    nome: string;
}

@Component({
    selector: 'client-list',
    templateUrl: './client-list.component.html',
    styleUrls: ['./client-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class ClientListComponent implements OnInit {
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    showAlert: boolean = false;
    dataSource: any = [];
    displayedColumns: string[] = ['id', 'nome', 'actions'];

    rota = 'operations/client';
    widthScreen = window.screen.width;
    loading: boolean = true;

    @ViewChild(MatTable) table: MatTable<ClientModel>;

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
        this._api.clientFindAll().subscribe((res) => {
            this.dataSource = res;
            this.loading = false;
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
                'Com essa a????o, o perfil do usu??rio ser?? removido, permanentemente!',
                'Remover Cliente',
                true,
                { btnOkText: 'Remover', width }
            )
            .then((res) => {
                if (res) {
                    this.loading = true;
                    this._api.deleteClient(row.id).subscribe(
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
}
