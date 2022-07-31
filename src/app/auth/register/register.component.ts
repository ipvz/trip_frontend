import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {BackendClient} from '../../client/backend-client';
import {AuthenticationService} from '../authentication-service';
import notifications from '../../utils/notifications';
import {UserInfo} from '../../model/userAccess';
import {plainToClass, plainToInstance} from 'class-transformer';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    submitted: boolean;
    loading: boolean = false;

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
        this.registerForm = this.formBuilder.group({
            username: ['', [
                Validators.required,
                Validators.pattern('^[A-Za-z][A-Za-z0-9_]*$'),
                Validators.minLength(3),
                Validators.maxLength(30)]],
            email: ['', [
                Validators.required,
                Validators.email]],
            password: ['', [
                Validators.required,
                Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%_*\\-#?&])[A-Za-z\\d@$!%_*\\-#?&]*$'),
                Validators.minLength(6),
                Validators.maxLength(100)]],
            confirmPassword: ['', []],
            firstName: ['', []],
            lastName: ['', []],
            about: ['', []],
        }, {validators: this.checkPasswords});
    }

    checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
        let pass = group.get('password').value;
        let confirmPass = group.get('confirmPassword').value
        return pass == confirmPass ? null : {notSame: true}
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.registerForm.controls;
    }

    update() {
        if (this.loading) {
            return;
        }

        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;

        let formData = this.registerForm.value
        formData.confirmPassword = undefined

        this.backendClient
            .register(plainToInstance(UserInfo, formData))
            .subscribe(() => {
                    console.log("REGISTERED")
                    notifications.showNotificationSuccess('Registered!');
                    this.router.navigate(['/'])
                },
                error => {
                    this.loading = false
                }
            )
    }
}
