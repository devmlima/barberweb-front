import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FuseNavigationModule } from '@fuse/components/navigation';
import { SearchModule } from 'app/layout/common/search/search.module';
import { UserMenuModule } from 'app/layout/common/user-menu/user-menu.module';
import { SharedModule } from 'app/shared/shared.module';
import { EnterpriseLayoutComponent } from 'app/layout/layouts/horizontal/enterprise/enterprise.component';

@NgModule({
    declarations: [
        EnterpriseLayoutComponent
    ],
    imports     : [
        HttpClientModule,
        RouterModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        FuseNavigationModule,
        SearchModule,
        UserMenuModule,
        SharedModule
    ],
    exports     : [
        EnterpriseLayoutComponent
    ]
})
export class EnterpriseLayoutModule
{
}
