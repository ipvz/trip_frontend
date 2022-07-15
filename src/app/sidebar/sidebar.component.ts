import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../auth/authentication-service';
import {Router} from '@angular/router';

declare const $: any;

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    {path: '/new', title: 'New T-route', icon: 'pe-7s-graph', class: ''},
    {path: '/logout', title: 'Log out', icon: 'pe-7s-plug', class: 'active-pro'},
    {path: '/user', title: 'User Profile', icon: 'pe-7s-user', class: ''},
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
    menuItems: any[];
    static logoutFunction: () => void;


    constructor(
        private authenticationService: AuthenticationService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

    onClick($event: MouseEvent, menuItem: RouteInfo) {
        if (menuItem.path == '/logout') {
            this.authenticationService.logout()
            this.router.navigate(['/login'])
        }
    }

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };
}
