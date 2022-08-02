import {Component, OnInit} from '@angular/core';
import {BackendClient} from '../client/backend-client';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from './authentication-service';
import {first} from 'rxjs/operators';
import notifications from '../utils/notifications';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private backendClient: BackendClient,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', [
                Validators.required,
                Validators.pattern('^[A-Za-z][A-Za-z0-9_]*$'),
                Validators.minLength(3),
                Validators.maxLength(30)]],
            password: ['', [
                Validators.required,
                Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%_*\\-#?&])[A-Za-z\\d@$!%_*\\-#?&]*$'),
                Validators.minLength(6),
                Validators.maxLength(100)]]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.loginForm.controls;
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;

        const username = this.f.username.value;
        const password = this.f.password.value;

        this.authenticationService.login(username, password)
            .pipe(first())
            .subscribe(
                data => {
                    notifications.showNotificationSuccess(`Hello, ${username}!`)
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.loading = false;
                });
    }


}
