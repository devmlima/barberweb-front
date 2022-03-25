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
import { SharedModule } from '../../../shared/shared.module';
import { FilterServiceDialog } from './dialogs/filter-service.dialog';
import { RelServicesComponent } from './rel-services.component';
import { relServicesRoutes } from './rel-services.routing';

@NgModule({
    declarations: [
        RelServicesComponent,
        
        // dialogs
        FilterServiceDialog,
    ],
    imports: [
        RouterModule.forChild(relServicesRoutes),
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
export class RelServicesModule {}
