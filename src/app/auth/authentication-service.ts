import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../model/user';
import {BackendClient} from '../client/backend-client';


const LOCAL_STORAGE_USER_KEY = 'currentUser'

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private backendClient: BackendClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_KEY)));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username, password) {
        return this.backendClient.login(username, password)
            .pipe(map(user => {
                console.log(localStorage.getItem('currentUser'));
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
        this.currentUserSubject.next(null);
    }
}
