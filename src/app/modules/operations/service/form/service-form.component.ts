import { get } from 'lodash';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from './../../../../api/services/api.service';
import { FuseAlertType } from './../../../../../@fuse/components/alert/alert.types';
import { fuseAnimations } from './../../../../../@fuse/animations/public-api';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { iif } from 'rxjs';

@Component({
    selector: 'service-form',
    templateUrl: './service-form.component.html',
    styleUrls: ['./service-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class ServiceFormComponent implements OnInit {
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    showAlert: boolean = false;
    formGroup: FormGroup;
    rota = 'operations/services';
    isNew = true;
    id: number = null;
    loading: boolean = true;

    constructor(
        private readonly _formBuilder: FormBuilder,
        private readonly _router: Router,
        private readonly _route: ActivatedRoute,
        private readonly _apiService: ApiService
    ) {}

    ngOnInit(): void {
        this.formGroup = this._formBuilder.group({
            step1: this._formBuilder.group({
                descricao: ['', [Validators.required]],
            }),
        });

        this.loadingInstance();
    }

    loadingInstance(): void {
        this._route.params.subscribe((params) => {
            this.id = params.id;
            if (this.id) {
                this._apiService.serviceFindById(params.id).subscribe((res) => {
                    if (res) {
                        this.convertForm(res);
                        this.isNew = false;
                        this.loading = false;
                    } else {
                        this.isNew = true;
                        this.loading = false;
                    }
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
                this._apiService.createService(object),
                this._apiService.updateService(object)
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
                    'Formul??rio inv??lido, verifique as informa????es preenchidas!',
            };
            this.showAlert = true;
        }
    }

    back(): void {
        this._router.navigate([`${this.rota}`]);
    }

    private convertModel(object) {
        const objectReturn = {
            id: null,
            descricao: null,
        };

        objectReturn.id = this.id;
        objectReturn.descricao = get(object, 'step1.descricao', '');

        return objectReturn;
    }

    private convertForm(object) {
        const step1 = {
            descricao: object.descricao,
        };

        this.formGroup.get('step1').patchValue(step1);

        return object;
    }
}
