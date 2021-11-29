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

export interface ServiceModel {
    descricao: string;
}

@Component({
    selector: 'service-list',
    templateUrl: './service-list.component.html',
    styleUrls: ['./service-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class ServiceListComponent implements OnInit {
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    showAlert: boolean = false;
    dataSource: any = [];
    displayedColumns: string[] = ['descricao', 'actions'];

    rota = 'operations/services';
    widthScreen = window.screen.width;
    loading: boolean = true;

    @ViewChild(MatTable) table: MatTable<ServiceModel>;

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
        this._api.serviceFindAll().subscribe((res) => {
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
                'Com essa ação, o perfil do usuário será removido, permanentemente!',
                'Remover Perfil do usuário',
                true,
                { btnOkText: 'Remover', width }
            )
            .then((res) => {
                if (res) {
                    console.log(row)
                    this.loading = true;
                    this._api.deleteService(row.id).subscribe(
                        (res) => {
                            this.loadingRows();
                            this.dc.detectChanges();
                            this.loading = false;

                            this.alert = {
                                type: 'success',
                                message: 'Registro removido com sucesso',
                            };
                        },
                        (err) => {
                            this.loading = false;
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
