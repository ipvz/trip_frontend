import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {AdminLayoutRoutes} from './admin-layout.routing';

import {HomeComponent} from '../../home/home.component';
import {LoginComponent} from '../../auth/login.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        ReactiveFormsModule
    ],
    declarations: [
        HomeComponent,
        LoginComponent
    ]
})
export class AdminLayoutModule {
}
