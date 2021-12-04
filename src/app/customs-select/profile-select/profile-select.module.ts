import { ProfileSelectComponent } from './profile-select.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
    ],
    declarations: [
        ProfileSelectComponent
    ],
    exports: [
        ProfileSelectComponent
    ]
})
export class ProfileSelectModule { }
