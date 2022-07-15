import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../auth/authentication-service';
import {BackendClient} from '../client/backend-client';
import {UserInfo} from '../model/userLogin';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    userInfo: UserInfo;

    constructor(
        private authenticationService: AuthenticationService,
        private backendClient: BackendClient) {
    }

    ngOnInit() {
        this.backendClient.getUserInfo(this.authenticationService.currentUserValue.username)
            .subscribe(
                user => {
                    this.userInfo = user;
                },
                error => {
                }
            )
    }

}
