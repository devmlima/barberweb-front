import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from './../../../../@fuse/animations/public-api';
import { FuseAlertType } from './../../../../@fuse/components/alert/alert.types';
import { ApiService } from './../../../api/services/api.service';
import { defaultChartConfig, defaultLineChartConfig } from './dashboard.helper';


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
        labels: [],
        dataset: [{
            label: 'Faturamento em R$ nos últimos 7 dias',
            data: [],
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
        this.faturamentLastSevenDays();
        this.faturamentForUser();
        this.servicesMades();
        this.schedules();
        this.schedulesCanceled();
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

    faturamentLastSevenDays() {
        this.apiService.faturamentLastSevenDays().subscribe(res => {
            this.configFaturament.labels = res.labels;
            this.configFaturament.dataset[0].data = res.data;
        });
    }
    
    faturamentForUser() {
        this.apiService.faturamentForUser().subscribe(res => {
            this.configUser.labels = res.labels;
            this.configUser.dataset[0].data = res.data;
        });
    }
    
    servicesMades() {
        this.apiService.servicesMades().subscribe(res => {
            this.configServices.labels = res.labels;
            this.configServices.dataset[0].data = res.data;
        });
    }
    
    schedules() {
        this.apiService.schedules().subscribe(res => {
            this.configSchedule.labels = res.labels;
            this.configSchedule.dataset[0].data = res.data;
        });
    }
    
    schedulesCanceled() {
        this.apiService.schedulesCanceled().subscribe(res => {
            this.configScheduleCanceled.labels = res.labels;
            this.configScheduleCanceled.dataset[0].data = res.data;

            this.loading = false;
        });
    }
}
