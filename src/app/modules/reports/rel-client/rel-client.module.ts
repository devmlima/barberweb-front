import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { DialogsModule } from '@fuse/services/dialogs/dialogs.module';
import { CustomsSelectModule } from './../../../customs-select/customs-select.module';
import { SharedModule } from './../../../shared/shared.module';
import { FilterClientDialog } from './dialogs/filter-client.dialog';
import { RelClientComponent } from './rel-client.component';
import { relClientRoutes } from './rel-client.routing';


@NgModule({
    declarations: [
        RelClientComponent,

        // dialogs
        FilterClientDialog
    ],
    imports: [
        CustomsSelectModule,

        RouterModule.forChild(relClientRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        SharedModule,
        DialogsModule,
    ],
})
export class RelClientModule { }
