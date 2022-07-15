import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RouteDto} from '../model/dto';
import {Observable} from 'rxjs';
import {UserInfo, UserLogin} from '../model/userLogin';

export abstract class BackendClient {
    abstract login(username, password): Observable<UserLogin>
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

    login(username, password): Observable<UserLogin> {
        return this.http.get<UserLogin>('assets/mock/json/login.json')
    }

    logout() {
    }

    getUserInfo(username): Observable<UserInfo> {
        return this.http.get<UserInfo>('assets/mock/json/user.json')
    }

}

