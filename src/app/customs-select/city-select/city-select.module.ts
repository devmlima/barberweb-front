import { CommonModule } from '@angular/common';
import { CitySelectComponent } from './city-select.component';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
    ],
    declarations: [
        CitySelectComponent
    ],
    exports: [
        CitySelectComponent
    ]
})
export class CitySelectModule { }
