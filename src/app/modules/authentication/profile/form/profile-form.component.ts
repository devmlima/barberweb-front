import { get } from 'lodash';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from './../../../../api/services/api.service';
import { FuseAlertType } from './../../../../../@fuse/components/alert/alert.types';
import { fuseAnimations } from './../../../../../@fuse/animations/public-api';
import { Component, ViewEncapsulation, OnInit, ChangeDetectorRef } from '@angular/core';
import { iif } from 'rxjs';

@Component({
    selector: 'profile-form',
    templateUrl: './profile-form.component.html',
    styleUrls: ['./profile-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class ProfileFormComponent implements OnInit {
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    showAlert: boolean = false;
    formGroup: FormGroup;
    rota = 'authentication/profile';
    isNew = true;
    id: number = null;

    permissions = {
        client: {
            reading: true,
            writing: false,
            all: false,
        },
        service: {
            reading: true,
            writing: false,
            all: false,
        },
        schedule: {
            reading: true,
            writing: false,
            all: false,
        },
        user: {
            reading: true,
            writing: false,
            all: false,
        },
        profile: {
            reading: true,
            writing: false,
            all: false,
        }
    };

    constructor(
        private readonly _formBuilder: FormBuilder,
        private readonly _router: Router,
        private readonly _route: ActivatedRoute,
        private readonly _apiService: ApiService,
        private readonly _dc: ChangeDetectorRef,
    ) { }

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
                this._apiService.profileFindById(params.id).subscribe((res) => {
                    if (res) {
                        this.convertForm(res);
                        this.isNew = false;
                    } else {
                        this.isNew = true;
                    }
                });
            }
        });
    }

    save(): void {
        if (this.formGroup.valid) {
            const object = this.convertModel(this.formGroup.value);
            iif(
                () => this.isNew,
                this._apiService.createProfile(object),
                this._apiService.updateProfile(object)
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

    getPermitions(group: string, action: string) {
       return this.permissions[group][action] || false;
    }

    handleCheck(group: string, action: string) {
        this.permissions[group][action] = !this.permissions[group][action];

        if (action === 'writing' && this.permissions[group][action]) {
            this.permissions[group].reading = true;
        }

        if (action === 'all') {
            this.permissions[group].reading = true;
            this.permissions[group].writing = true;
        }

        this._dc.detectChanges();
    }

    private convertModel(object) {
        const objectReturn = {
            id: null,
            descricao: null,
            permissoes: null,
        };

        objectReturn.id = this.id;
        objectReturn.descricao = get(object, 'step1.descricao', '');
        objectReturn.permissoes = JSON.stringify(this.permissions);

        return objectReturn;
    }

    private convertForm(object) {
        const step1 = {
            descricao: object.descricao,
        };

        this.formGroup.get('step1').patchValue(step1);
        if (object.permissoes) {
            const { client, schedule, service, user, profile } = JSON.parse(object.permissoes);

            client ? this.permissions.client = client : null;
            schedule ? this.permissions.schedule = schedule : null;
            service ? this.permissions.service = service : null;
            user ? this.permissions.user = user : null;
            profile ? this.permissions.profile = profile : null;
        }

        return object;
    }
}
