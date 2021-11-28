import { ServiceSelectComponent } from './services-select.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
    ],
    declarations: [
        ServiceSelectComponent
    ],
    exports: [
        ServiceSelectComponent
    ]
})
export class ServiceSelectModule { }
