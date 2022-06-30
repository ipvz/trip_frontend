import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import {AppRoutingModule} from './app.routing';
import {NavbarModule} from './shared/navbar/navbar.module';
import {SidebarModule} from './sidebar/sidebar.module';

import {AppComponent} from './app.component';

import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {HomeComponent} from './home/home.component';
import {ErrorHandlerHttpInterceptor} from './interceptors/error-handler.http.interceptor';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        RouterModule,
        HttpClientModule,
        NavbarModule,
        SidebarModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent
    ],
    providers: [
        HomeComponent,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerHttpInterceptor,
            multi: true,
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
