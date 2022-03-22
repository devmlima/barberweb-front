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

    updatePassword(dados: any): Observable<any> {
        return this.http
            .post(
                environment.apiUrl + '/users/updatePassword',
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
                    console.log(error)

                    return throwError(
                        get(error, 'error.text', null) ||
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
                        get(error, 'error.text', null) ||
                            'Erro ao atualizar o perfil, verifique sua rede de dados.'
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

    profileFindAll(filter = null): Observable<any> {
        const params: any = this.getHeaders(true);
        if (filter) {
            params.params = new HttpParams().set(
                'filter',
                JSON.stringify(filter)
            );
        }
        return this.http.get(environment.apiUrl + `/profile/find`, params);
    }

    deleteProfile(id): Observable<any> {
        const params: any = this.getHeaders(true);
        return this.http.delete(
            environment.apiUrl + `/profile/delete/${id}`,
            params
        );
    }

    createClient(dados: any): Observable<any> {
        return this.http
            .post(
                environment.apiUrl + '/client/create',
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

    updateClient(dados: any): Observable<any> {
        return this.http
            .put(
                environment.apiUrl + '/client/update',
                dados,
                this.getHeaders(true)
            )
            .pipe(
                catchError((error) => {
                    return throwError(
                        get(error, 'error.text', null) ||
                            'Erro ao atualizar o cliente, verifique sua rede de dados.'
                    );
                })
            );
    }

    clientFindById(id: number): Observable<any> {
        const params: any = this.getHeaders(true);
        return this.http.get(
            environment.apiUrl + `/client/findById/${id}`,
            params
        );
    }

    clientFindAll(filter = null): Observable<any> {
        const params: any = this.getHeaders(true);
        if (filter) {
            params.params = new HttpParams().set(
                'filter',
                JSON.stringify(filter)
            );
        }
        return this.http.get(environment.apiUrl + `/client/find`, params);
    }

    deleteClient(id): Observable<any> {
        const params: any = this.getHeaders(true);
        return this.http.delete(
            environment.apiUrl + `/client/delete/${id}`,
            params
        );
    }

    createService(dados: any): Observable<any> {
        return this.http
            .post(
                environment.apiUrl + '/service/create',
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

    updateService(dados: any): Observable<any> {
        return this.http
            .put(
                environment.apiUrl + '/service/update',
                dados,
                this.getHeaders(true)
            )
            .pipe(
                catchError((error) => {
                    return throwError(
                        get(error, 'error.text', null) ||
                            'Erro ao atualizar o serviço, verifique sua rede de dados.'
                    );
                })
            );
    }

    serviceFindById(id: number): Observable<any> {
        const params: any = this.getHeaders(true);
        return this.http.get(
            environment.apiUrl + `/service/findById/${id}`,
            params
        );
    }

    serviceFindAll(filter = null): Observable<any> {
        const params: any = this.getHeaders(true);
        if (filter) {
            params.params = new HttpParams().set(
                'filter',
                JSON.stringify(filter)
            );
        }
        return this.http.get(environment.apiUrl + `/service/find`, params);
    }

    deleteService(id): Observable<any> {
        const params: any = this.getHeaders(true);
        return this.http.delete(
            environment.apiUrl + `/service/delete/${id}`,
            params
        );
    }

    createSchedule(dados: any): Observable<any> {
        return this.http
            .post(
                environment.apiUrl + '/schedule/create',
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

    updateSchedule(dados: any): Observable<any> {
        return this.http
            .put(
                environment.apiUrl + '/schedule/update',
                dados,
                this.getHeaders(true)
            )
            .pipe(
                catchError((error) => {
                    return throwError(
                        get(error, 'error.text', null) ||
                            'Erro ao atualizar o agendamento, verifique sua rede de dados.'
                    );
                })
            );
    }

    scheduleFindById(id: number): Observable<any> {
        const params: any = this.getHeaders(true);
        return this.http.get(
            environment.apiUrl + `/schedule/findById/${id}`,
            params
        );
    }

    scheduleFindAll(filter = null): Observable<any> {
        const params: any = this.getHeaders(true);
        if (filter) {
            params.params = new HttpParams().set(
                'filter',
                JSON.stringify(filter)
            );
        }
        return this.http.get(environment.apiUrl + `/schedule/find`, params);
    }

    deleteSchedule(id): Observable<any> {
        const params: any = this.getHeaders(true);
        return this.http.delete(
            environment.apiUrl + `/schedule/delete/${id}`,
            params
        );
    }

    cityFind(filter = null): Observable<any> {
        const params: any = this.getHeaders(true);
        if (filter) {
            params.params = new HttpParams().set(
                'filter',
                JSON.stringify(filter)
            );
        }
        return this.http.get(environment.apiUrl + `/city/find`, params);
    }

    stateFind(filter = null): Observable<any> {
        const params: any = this.getHeaders(true);
        if (filter) {
            params.params = new HttpParams().set(
                'filter',
                JSON.stringify(filter)
            );
        }
        return this.http.get(environment.apiUrl + `/state/find`, params);
    }

    searchCep(filter = null): Observable<any> {
        const params: any = this.getHeaders(true);
        if (filter) {
            params.params = new HttpParams().set(
                'filter',
                JSON.stringify(filter)
            );
        }
        return this.http.get(environment.apiUrl + `/client/searchCep`, params);
    }

    createcutsMade(dados: any): Observable<any> {
        return this.http
            .post(
                environment.apiUrl + '/cutsMade/create',
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

    updatecutsMade(dados: any): Observable<any> {
        return this.http
            .put(
                environment.apiUrl + '/cutsMade/update',
                dados,
                this.getHeaders(true)
            )
            .pipe(
                catchError((error) => {
                    return throwError(
                        get(error, 'error.text', null) ||
                            'Erro ao atualizar o agendamento, verifique sua rede de dados.'
                    );
                })
            );
    }

    cutsMadeFindById(id: number): Observable<any> {
        const params: any = this.getHeaders(true);
        return this.http.get(
            environment.apiUrl + `/cutsMade/findById/${id}`,
            params
        );
    }

    cutsMadeFindAll(filter = null): Observable<any> {
        const params: any = this.getHeaders(true);
        if (filter) {
            params.params = new HttpParams().set(
                'filter',
                JSON.stringify(filter)
            );
        }
        return this.http.get(environment.apiUrl + `/cutsMade/find`, params);
    }

    deletecutsMade(id): Observable<any> {
        const params: any = this.getHeaders(true);
        return this.http.delete(
            environment.apiUrl + `/cutsMade/delete/${id}`,
            params
        );
    }

    dashCutsAll(): Observable<any> {
        const params: any = this.getHeaders(true);
        return this.http.get(environment.apiUrl + `/dashboard/cutsAll`, params);
    }

    dashFaturamentAll(): Observable<any> {
        const params: any = this.getHeaders(true);
        return this.http.get(environment.apiUrl + `/dashboard/faturamentAll`, params);
    }

    userMonth(): Observable<any> {
        const params: any = this.getHeaders(true);
        return this.http.get(environment.apiUrl + `/dashboard/userMonth`, params);
    }

    faturamentForUser(): Observable<any> {
        const params: any = this.getHeaders(true);
        return this.http.get(environment.apiUrl + `/dashboard/faturamentForUser`, params);
    }
}
