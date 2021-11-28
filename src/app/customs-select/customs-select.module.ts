import { StateSelectModule } from './state-select/state-select.module';
import { CitySelectModule } from './city-select/city-select.module';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

import { NgModule } from '@angular/core';
import { ServiceSelectModule } from './services-select/services-select.module';
import { ClientSelectModule } from './client-select/client-select.module';

@NgModule({
    imports: [
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,

        CitySelectModule,
        StateSelectModule,
        ServiceSelectModule,
        ClientSelectModule,
    ],
    exports: [
        CitySelectModule,
        StateSelectModule,
        ServiceSelectModule,
        ClientSelectModule,
    ],
})
export class CustomsSelectModule {}
