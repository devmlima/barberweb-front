import { environment } from './../../../environments/environment';
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/member-ordering */

import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { Router } from '@angular/router';
import { Injector, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { get } from 'lodash';

import { UserLoggedService } from './userLogged.service';

@Injectable()
export class ApiService {
    constructor(
        private http: HttpClient,
        private injector: Injector,
        private readonly _userLogged: UserLoggedService
    ) {}

    private getHeaders(appendAuth: boolean = false): any {
        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        const router = this.injector.get(Router);
        headers = headers.set('Menu', router.url);
        if (appendAuth && this._userLogged.isLogged()) {
            headers = headers.set('Authorization', this._userLogged.getToken());
        }
        return {
            headers,
        };
    }

    login(dados: any): Observable<any> {
        return this.http
            .post(environment.apiUrl + '/users/login', dados, this.getHeaders())
            .pipe(
                catchError((error) => {
                    return throwError(
                        get(error, 'error.message', null) ||
                            'Erro ao realizar login, verifique sua rede de dados.'
                    );
                })
            );
    }

    signUp(dados: any): Observable<any> {
        return this.http
            .post(
                environment.apiUrl + '/users/signUp',
                dados,
                this.getHeaders()
            )
            .pipe(
                catchError((error) => {
                    return throwError(
                        get(error, 'error.message', null) ||
                            'Erro ao realizar o cadastro, verifique sua rede de dados.'
                    );
                })
            );
    }

    dataUser(): Observable<any> {
        const params: any = this.getHeaders(true);
        params.params = new HttpParams().set(
            'filter',
            JSON.stringify({ include: ['PerfilUsuario'] })
        );
        return this.http.get(environment.apiUrl + '/users/dataUser', params);
    }
}
