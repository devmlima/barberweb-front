import { CommonModule } from '@angular/common';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { ClientSelectComponent } from './client-select.component';

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
    ],
    declarations: [
        ClientSelectComponent
    ],
    exports: [
        ClientSelectComponent
    ]
})
export class ClientSelectModule { }
