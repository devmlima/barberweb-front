import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { DialogsModule } from '@fuse/services/dialogs/dialogs.module';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from './../../../shared/shared.module';
import { RelClientComponent } from './rel-client.component';
import { relClientRoutes } from './rel-client.routing';


@NgModule({
    declarations: [
        RelClientComponent
    ],
    imports: [
        RouterModule.forChild(relClientRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        SharedModule,
        DialogsModule,
        ChartsModule,
    ],
})
export class RelClientModule {}
