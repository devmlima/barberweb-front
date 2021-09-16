import { ApiService } from './../api/services/api.service';
import { AuthGuard } from './../core/auth/guards/auth.guard';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalStorageModule } from 'angular-2-local-storage';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        LocalStorageModule.forRoot({
            prefix: 'barber-web',
            storageType: 'localStorage'
        }),
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        AuthGuard,
        ApiService,
        { provide: LOCALE_ID, useValue: 'pt' },
    ]
})
export class SharedModule
{
}
