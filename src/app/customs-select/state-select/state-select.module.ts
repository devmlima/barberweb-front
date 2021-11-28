import { StateSelectComponent } from './state-select.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
    ],
    declarations: [
        StateSelectComponent
    ],
    exports: [
        StateSelectComponent
    ]
})
export class StateSelectModule { }
