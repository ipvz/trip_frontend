import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import {AppRoutingModule} from './app.routing';
import {NavbarModule} from './shared/navbar/navbar.module';
import {SidebarModule} from './sidebar/sidebar.module';

import {AppComponent} from './app.component';

import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {HomeComponent} from './home/home.component';
import {ErrorHandlerHttpInterceptor} from './interceptors/error-handler.http.interceptor';
import {ApiBackendClient, BackendClient, MockBackendClient} from './client/backend-client';
import {LoginComponent} from './auth/login.component';
import {environment} from '../environments/environment';
import {RegisterComponent} from './auth/register/register.component';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpClientModule,
        NavbarModule,
        SidebarModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        LoginComponent,
        RegisterComponent
    ],
    providers: [
        HomeComponent,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerHttpInterceptor,
            multi: true,
        },
        {
            provide: BackendClient,
            useClass: environment.production ? ApiBackendClient : MockBackendClient
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
