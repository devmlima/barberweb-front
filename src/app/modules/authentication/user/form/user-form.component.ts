import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from './../../../../api/services/api.service';
import { FuseAlertType } from './../../../../../@fuse/components/alert/alert.types';
import { fuseAnimations } from './../../../../../@fuse/animations/public-api';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
    selector: 'user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class UserFormComponent implements OnInit {
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    showAlert: boolean = false;
    formGroup: FormGroup;
    rota = 'authentication/user';
    
    constructor(
        private readonly _api: ApiService,
        private readonly _formBuilder: FormBuilder,
        private readonly _router: Router,
        private readonly _apiService: ApiService
    ) {}

    ngOnInit(): void {
        this.formGroup = this._formBuilder.group({
            step1: this._formBuilder.group({
                email: ['', [Validators.required, Validators.email]],
                nome: ['', Validators.required],
                cpf: ['', []],
            }),
            step2: this._formBuilder.group({
                senha: ['', []],
            }),
            step3: this._formBuilder.group({
            }),
        });
    }

    save(): void {
        console.log('salvo');
    }

    back(): void {
        this._router.navigate([`${this.rota}`]);
    }
}
