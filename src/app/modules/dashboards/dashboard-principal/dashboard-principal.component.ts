import { ApiService } from './../../../api/services/api.service';
import { defaultChartConfig, defaultLineChartConfig } from './dashboard.helper';
import { FuseAlertType } from './../../../../@fuse/components/alert/alert.types';
import { fuseAnimations } from './../../../../@fuse/animations/public-api';

import { Component, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
    selector: 'dashboard-principal',
    templateUrl: './dashboard-principal.component.html',
    styleUrls: ['./dashboard-principal.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class DashboardPrincipalComponent implements OnInit {
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    showAlert: boolean = false;
    loading: boolean = false;

    configServices: any = {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'],
        dataset: [{
            label: 'Qtd. de Serviços realizados',
            data: [10, 20, 30, 40, 50, 60, 70]
        }]
    };

    configSchedule: any = {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'],
        dataset: [{
            label: 'Qtd. de Agendamentos',
            data: [10, 20, 30, 40, 50, 60, 70],
        }]
    };

    configScheduleCanceled: any = {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'],
        dataset: [{
            label: 'Qtd. de Agendamentos Cancelados',
            data: [0, 2, 2, 8, 1, 1, 13],
        }]
    };

    configFaturament: any = {
        labels: ['15/03/2022', '16/03/2022', '17/03/2022', '18/03/2022', '19/03/2022', '20/03/2022', '21/03/2022'],
        dataset: [{
            label: 'Faturamento em R$ nos ultimos 7 dias',
            data: [430.31,  800.20,  1090.02,  4590.91,  5871.37,  0.0,  90.01],
            hoverOffset: 4
        }]
    };

    configUser: any = {
        labels: [],
        dataset: [{
            data: [],
            hoverOffset: 4
        }]
    };

    chartOptions = defaultChartConfig;
    chartLineOptions = defaultLineChartConfig;
    countCutsAll = 0;
    faturament = `R$ 0`;
    userMonth = ``;

    constructor(
        private readonly apiService: ApiService,
    ) { }

    ngOnInit(): void {
        this.loading = true;

        this.cutsAll();
        this.faturamentAll();
        this.userBest();
        this.faturamentForUser();
    }

    cutsAll() {
        this.apiService.dashCutsAll().subscribe(res => {
            this.countCutsAll = res;
        });
    }

    faturamentAll() {
        this.apiService.dashFaturamentAll().subscribe(res => {
            this.faturament = res;
        });
    }

    userBest() {
        this.apiService.userMonth().subscribe(res => {
            this.userMonth = res;
        });
    }

    faturamentForUser() {
        this.apiService.faturamentForUser().subscribe(res => {
            this.configUser.labels = res.labels;
            this.configUser.dataset[0].data = res.data;
            this.loading = false;
        });
    }
}
