/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable max-len */
import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

// @formatter:off
// tslint:disable:max-line-length
export const appRoutes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboards/dashboard-principal',
    },

    {
        path: 'signed-in-redirect',
        pathMatch: 'full',
        redirectTo: 'dashboards/dashboard-principal',
    },

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'forgot-password',
                loadChildren: () =>
                    import(
                        'app/modules/auth/forgot-password/forgot-password.module'
                    ).then((m) => m.AuthForgotPasswordModule),
            },
            {
                path: 'reset-password',
                loadChildren: () =>
                    import(
                        'app/modules/auth/reset-password/reset-password.module'
                    ).then((m) => m.AuthResetPasswordModule),
            },
            {
                path: 'sign-in',
                loadChildren: () =>
                    import('app/modules/auth/sign-in/sign-in.module').then(
                        (m) => m.AuthSignInModule
                    ),
            },
            {
                path: 'sign-up',
                loadChildren: () =>
                    import('app/modules/auth/sign-up/sign-up.module').then(
                        (m) => m.AuthSignUpModule
                    ),
            },
        ],
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'sign-out',
                loadChildren: () =>
                    import('app/modules/auth/sign-out/sign-out.module').then(
                        (m) => m.AuthSignOutModule
                    ),
            },
            {
                path: 'unlock-session',
                loadChildren: () =>
                    import(
                        'app/modules/auth/unlock-session/unlock-session.module'
                    ).then((m) => m.AuthUnlockSessionModule),
            },
        ],
    },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {
                path: 'admin',
                loadChildren: () =>
                    import('app/modules/admin/init/init.module').then(
                        (m) => m.InitModule
                    ),
            },
        ],
    },

    // Dashboards routes
    {
        path: 'dashboards',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {
                path: 'dashboard-principal',
                loadChildren: () =>
                    import(
                        'app/modules/dashboards/dashboard-principal/dashboard-principal.module'
                    ).then((m) => m.DashboardModule),
            },
        ],
    },

    // Autentication routes
    {
        path: 'authentication',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {
                path: 'user',
                loadChildren: () =>
                    import('app/modules/authentication/user/user.module').then(
                        (m) => m.UserModule
                    ),
            },
            {
                path: 'profile',
                loadChildren: () =>
                    import(
                        'app/modules/authentication/profile/profile.module'
                    ).then((m) => m.ProfileModule),
            },
            {
                path: 'mydata',
                loadChildren: () =>
                    import(
                        'app/modules/authentication/my-data/my-data.module'
                    ).then((m) => m.MyDataModule),
            },
        ],
    },

    // Operations routes
    {
        path: 'operations',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {
                path: 'client',
                loadChildren: () =>
                    import('app/modules/operations/client/client.module').then(
                        (m) => m.ClientModule
                    ),
            },
            {
                path: 'services',
                loadChildren: () =>
                    import(
                        'app/modules/operations/service/service.module'
                    ).then((m) => m.ServiceModule),
            },
            {
                path: 'schedule',
                loadChildren: () =>
                    import(
                        'app/modules/operations/schedule/schedule.module'
                    ).then((m) => m.ScheduleModule),
            },
        ],
    },
];
