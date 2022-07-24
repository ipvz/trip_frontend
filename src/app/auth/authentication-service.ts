import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {UserAccess} from '../model/userAccess';
import {BackendClient} from '../client/backend-client';


const LOCAL_STORAGE_USER_KEY = 'currentUser'

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<UserAccess>;
    public currentUser: Observable<UserAccess>;

    constructor(private backendClient: BackendClient) {
        this.currentUserSubject = new BehaviorSubject<UserAccess>(JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_KEY)));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): UserAccess {
        return this.currentUserSubject.value;
    }

    login(username, password) {
        return this.backendClient.login(username, password)
            .pipe(map(user => {
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
