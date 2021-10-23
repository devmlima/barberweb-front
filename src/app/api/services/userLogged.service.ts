import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { get } from 'lodash';

@Injectable({
    providedIn: 'root',
})
export class UserLoggedService {
    private static userLogged: any = null;
    private static isLoaded: boolean = false;

    public static observer: BehaviorSubject<any> = new BehaviorSubject<any>(
        null
    );

    constructor(private _localStorage: LocalStorageService) {}

    private loadUser(): void {
        let userLogged: any = this._localStorage.get('userLogged');
        if (userLogged) {
            try {
                userLogged = JSON.parse(userLogged);
            } catch (e) {
                userLogged = null;
            }
        } else {
            UserLoggedService.userLogged = null;
        }

        UserLoggedService.isLoaded = true;
        this.set(userLogged);
    }

    private saveUser(): void {
        this._localStorage.set(
            'userLogged',
            JSON.stringify(UserLoggedService.userLogged)
        );
    }

    public get(key: string = null): any {
        if (!UserLoggedService.isLoaded) {
            this.loadUser();
        }
        if (!key) {
            return UserLoggedService.userLogged;
        } else {
            return get(UserLoggedService.userLogged, key);
        }
    }

    public isLogged(): boolean {
        const result: boolean = !!this.get();
        return result;
    }

    public getToken(): string {
        return UserLoggedService.userLogged
            ? get(UserLoggedService, 'userLogged.token', null)
            : null;
    }

    public set(user: any): void {
        UserLoggedService.userLogged = user;
        this.saveUser();
        UserLoggedService.observer.next(user ? user.user : null);
    }

    public logout(): void {
        this.set(null);
    }

    public static initUserApp(
        userLoggedService: UserLoggedService,
        injector: Injector,
        apiService: ApiService
    ): () => Promise<any> {
        return (): Promise<any> => {
            return new Promise((resolve, reject) => {
                const router = injector.get(Router);
                userLoggedService.loadUser();
                if (userLoggedService.isLogged()) {
                    apiService.dataUser().subscribe(
                        (result) => {
                            const user = Object.assign(
                                {},
                                UserLoggedService.userLogged,
                                { user: result }
                            );
                            userLoggedService.set(user);
                            resolve(null);
                        },
                        (err) => {
                            if (err.statusCode === 401 || err.status === 401) {
                                userLoggedService.set(null);
                                router.navigate(['/sign-in']);
                            }
                            resolve(null);
                        }
                    );
                } else {
                    resolve(null);
                }
            });
        };
    }
}
