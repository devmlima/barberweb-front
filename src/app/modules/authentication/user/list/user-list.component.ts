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

export interface UserModel {
    nome: string;
    email: string;
}

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
    widthScreen = window.screen.width;
    loading: boolean = true;

    @ViewChild(MatTable) table: MatTable<UserModel>;

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
        this._api.getUsers().subscribe((res) => {
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
                'Com essa ação, o usuário será removido, permanentemente!',
                'Remover usuário',
                true,
                { btnOkText: 'Remover', width }
            )
            .then((res) => {
                if (res) {
                    this.loading = true;
                    this._api.deleteUser(row.id).subscribe(
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
