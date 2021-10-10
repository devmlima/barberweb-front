import { SignUpCompanyDialog } from './dialogs/signUpCompany.dialog';
import { DialogsModule } from './../../../../@fuse/services/dialogs/dialogs.module';
import { CpfCnpjPipe } from './../../pipes/cpfCnpj.pipe';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FuseCardModule } from '@fuse/components/card';
import { FuseAlertModule } from '@fuse/components/alert';
import { SharedModule } from 'app/shared/shared.module';
import { AuthSignUpComponent } from 'app/modules/auth/sign-up/sign-up.component';
import { authSignupRoutes } from 'app/modules/auth/sign-up/sign-up.routing';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    declarations: [AuthSignUpComponent, CpfCnpjPipe, SignUpCompanyDialog],
    imports: [
        RouterModule.forChild(authSignupRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        FuseCardModule,
        FuseAlertModule,
        SharedModule,
        DialogsModule,
    ],
})
export class AuthSignUpModule {}
