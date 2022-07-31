import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RouteDto} from '../model/dto';
import {Observable} from 'rxjs';
import {UserAccess, UserInfo, UserLogin} from '../model/userAccess';
import {environment} from '../../environments/environment';

export abstract class BackendClient {
    abstract login(username, password): Observable<UserAccess>
    abstract register(userInfo: UserInfo): Observable<Object>
    abstract logout()
    abstract getCoords(): Observable<RouteDto>
    abstract getUserInfo(username): Observable<UserInfo>
}

@Injectable()
export class MockBackendClient implements BackendClient {

    constructor(private http: HttpClient) { }

    getCoords(): Observable<RouteDto> {
        return this.http.get<RouteDto>('assets/mock/json/coords.json')
    }

    login(username, password): Observable<UserAccess> {
        return this.http.get<UserAccess>('assets/mock/json/login.json')
    }

    register(userInfo: UserInfo): Observable<Object> {
        return new Observable<Object>()
    }

    logout() {
    }

    getUserInfo(username): Observable<UserInfo> {
        return this.http.get<UserInfo>('assets/mock/json/user.json')
    }

}

@Injectable()
export class ApiBackendClient implements BackendClient {

    constructor(private http: HttpClient) { }

    getCoords(): Observable<RouteDto> {
        return this.http.get<RouteDto>(`${environment.apiUrl}/map/coords`)
    }

    login(username, password): Observable<UserAccess> {
        return this.http.post<UserAccess>(`${environment.apiUrl}/auth/login`, new UserLogin(username, password))
    }

    register(userInfo: UserInfo): Observable<Object> {
        return this.http.post(`${environment.apiUrl}/auth/register`, userInfo)
    }

    logout() {
    }

    getUserInfo(username): Observable<UserInfo> {
        return this.http.get<UserInfo>(`${environment.apiUrl}/user/info`)
    }

}

