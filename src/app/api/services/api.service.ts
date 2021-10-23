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

    createUser(dados: any): Observable<any> {
        return this.http
            .post(
                environment.apiUrl + '/users/create',
                dados,
                this.getHeaders(true)
            )
            .pipe(
                catchError((error) => {
                    return throwError(
                        get(error, 'error.message', null) ||
                            'Erro ao realizar criar o usuário, verifique sua rede de dados.'
                    );
                })
            );
    }

    updateUser(dados: any): Observable<any> {
        return this.http
            .put(
                environment.apiUrl + '/users/update',
                dados,
                this.getHeaders(true)
            )
            .pipe(
                catchError((error) => {
                    return throwError(
                        get(error, 'error.message', null) ||
                            'Erro ao atualizar o usuário, verifique sua rede de dados.'
                    );
                })
            );
    }

    userFindById(id: number): Observable<any> {
        const params: any = this.getHeaders(true);
        return this.http.get(
            environment.apiUrl + `/users/findById/${id}`,
            params
        );
    }

    deleteUser(id): Observable<any> {
        const params: any = this.getHeaders(true);
        return this.http.delete(
            environment.apiUrl + `/users/delete/${id}`,
            params
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

    getUsers(): Observable<any> {
        const params: any = this.getHeaders(true);
        params.params = new HttpParams().set(
            'filter',
            JSON.stringify({ include: ['PerfilUsuario'] })
        );

        return this.http.get(environment.apiUrl + '/users/find', params);
    }

    createProfile(dados: any): Observable<any> {
        return this.http
            .post(
                environment.apiUrl + '/profile/create',
                dados,
                this.getHeaders(true)
            )
            .pipe(
                catchError((error) => {
                    return throwError(
                        get(error, 'error.message', null) ||
                            'Erro ao realizar criar o usuário, verifique sua rede de dados.'
                    );
                })
            );
    }

    updateProfile(dados: any): Observable<any> {
        return this.http
            .put(
                environment.apiUrl + '/profile/update',
                dados,
                this.getHeaders(true)
            )
            .pipe(
                catchError((error) => {
                    return throwError(
                        get(error, 'error.message', null) ||
                            'Erro ao atualizar o usuário, verifique sua rede de dados.'
                    );
                })
            );
    }

    profileFindById(id: number): Observable<any> {
        const params: any = this.getHeaders(true);
        return this.http.get(
            environment.apiUrl + `/profile/findById/${id}`,
            params
        );
    }

    profileFindAll(): Observable<any> {
        const params: any = this.getHeaders(true);
        return this.http.get(
            environment.apiUrl + `/profile/find`,
            params
        );
    }

    deleteProfile(id): Observable<any> {
        const params: any = this.getHeaders(true);
        return this.http.delete(
            environment.apiUrl + `/profile/delete/${id}`,
            params
        );
    }
}
