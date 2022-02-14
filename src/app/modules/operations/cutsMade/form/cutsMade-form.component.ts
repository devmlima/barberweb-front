import { get } from 'lodash-es';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from './../../../../api/services/api.service';
import { FuseAlertType } from './../../../../../@fuse/components/alert/alert.types';
import { fuseAnimations } from './../../../../../@fuse/animations/public-api';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { iif } from 'rxjs';

@Component({
    selector: 'cutsMade-form',
    templateUrl: './cutsMade-form.component.html',
    styleUrls: ['./cutsMade-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class CutsMadeFormComponent implements OnInit {
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    showAlert: boolean = false;
    confirm: boolean = true;
    disable: boolean = false;
    formGroup: FormGroup;
    rota = 'operations/cutsMade';
    isNew = true;
    id: number = null;
    loading: boolean = true;

    constructor(
        private readonly _formBuilder: FormBuilder,
        private readonly _router: Router,
        private readonly _route: ActivatedRoute,
        private readonly _apiService: ApiService
    ) { }

    ngOnInit(): void {
        this.formGroup = this._formBuilder.group({
            step1: this._formBuilder.group({
                clienteId: [null, [Validators.required]],
                servicoId: [null, [Validators.required]],
                usuarioId: [null, [Validators.required]],
                valor: ['', []],
                hora: ['', [Validators.required, Validators.minLength(5)]],
                dataOperacao: ['', [Validators.required, Validators.minLength(10)]],
                cancelado: [false, []],
            }),
        });

        this.loadingInstance();
    }

    loadingInstance(): void {
        this._route.params.subscribe((params) => {
            this.id = params.id;
            if (this.id) {
                this._apiService
                    .cutsMadeFindById(params.id)
                    .subscribe((res) => {
                        if (res) {
                            this.convertForm(res);
                            this.isNew = false;
                        } else {
                            this.isNew = true;
                        }

                        this.loading = false;
                    });
            } else {
                this.loading = false;
            }
        });
    }

    save(): void {
        if (this.formGroup.valid) {
            const object = this.convertModel(this.formGroup.value);
            iif(
                () => this.isNew,
                this._apiService.createcutsMade(object),
                this._apiService.updatecutsMade(object)
            ).subscribe(
                (res) => {
                    this.alert = {
                        type: 'success',
                        message: 'Registro criado com sucesso',
                    };
                    this.showAlert = true;
                    this._router.navigateByUrl(this.rota);
                },
                (err) => {
                    this.alert = {
                        type: 'error',
                        message: err,
                    };
                    this.showAlert = true;
                }
            );
        } else {
            this.alert = {
                type: 'error',
                message:
                    'Formulário inválido, verifique as informações preenchidas!',
            };
            this.showAlert = true;
        }
    }

    back(): void {
        this._router.navigate([`${this.rota}`]);
    }

    getCutsMade(): string {
        return this.confirm ? 'CONFIRMADO' : 'CANCELADO';
    }

    getClass(): string {
        return this.confirm ? 'confirm' : 'canceled';
    }

    private convertModel(object) {
        const objectReturn = {
            id: null,
            hora: null,
            cancelado: null,
            usuarioId: null,
            clienteId: null,
            servicoId: null,
            dataOperacao: null,
        };

        objectReturn.id = this.id;
        objectReturn.hora = object.step1.hora;
        objectReturn.cancelado = object.step1.cancelado;
        objectReturn.dataOperacao = object.step1.dataOperacao;
        objectReturn.usuarioId = get(object, 'step1.usuario.id', null);
        objectReturn.clienteId = get(object, 'step1.clienteId.id', null);
        objectReturn.servicoId = get(object, 'step1.servicoId.id', null);

        return objectReturn;
    }

    private convertForm(object) {
        const step1 = {
            id: object.id,
            hora: object.hora,
            dataOperacao: object.dataOperacao,
            usuarioId: object.user,
            clienteId: object.client,
            servicoId: object.service,
            cancelado: object.cancelado,
        };

        this.formGroup.get('step1').patchValue(step1);

        if (step1.cancelado) {
            this.formGroup.disable();
            this.disable = true;
        }

        return object;
    }
}
