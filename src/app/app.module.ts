import { environment } from 'environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, Injector } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';

import { MarkdownModule } from 'ngx-markdown';

import { FuseModule } from '@fuse';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { FuseConfigModule } from '@fuse/services/config';

import { apis } from 'app/api';
import { appRoutes } from 'app/app.routing';
import { AppComponent } from 'app/app.component';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { LayoutModule } from 'app/layout/layout.module';

import { ApiService } from './api/services/api.service';
import { UserLoggedService } from './api/services/userLogged.service';

import {
    SocialLoginModule,
    SocialAuthServiceConfig,
} from 'angularx-social-login';
import {
    GoogleLoginProvider,
    FacebookLoginProvider,
} from 'angularx-social-login';

const routerConfig: ExtraOptions = {
    scrollPositionRestoration: 'enabled',
    preloadingStrategy: PreloadAllModules,
};

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),

        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(apis),

        CoreModule,
        LayoutModule,
        MarkdownModule.forRoot({}),

        SocialLoginModule,
    ],
    bootstrap: [AppComponent],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: UserLoggedService.initUserApp,
            multi: true,
            deps: [UserLoggedService, Injector, ApiService],
        },
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
                autoLogin: false,
                providers: [
                    {
                        id: GoogleLoginProvider.PROVIDER_ID,
                        provider: new GoogleLoginProvider(
                            '713849256469-v0mte0datvl27lki4imdqgnuaaupv12k.apps.googleusercontent.com'
                        ),
                    },
                    // {
                    //   id: FacebookLoginProvider.PROVIDER_ID,
                    //   provider: new FacebookLoginProvider('clientId')
                    // }
                ],
            } as SocialAuthServiceConfig,
        },
    ],
})
export class AppModule {}
