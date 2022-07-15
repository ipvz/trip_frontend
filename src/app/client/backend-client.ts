import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RouteDto} from '../model/dto';
import {Observable} from 'rxjs';
import {User} from '../model/user';

export abstract class BackendClient {
    abstract login(username, password): Observable<User>
    abstract logout()
    abstract getCoords(): Observable<RouteDto>
}

@Injectable()
export class MockBackendClient implements BackendClient {

    constructor(private http: HttpClient) { }

    getCoords(): Observable<RouteDto> {
        return this.http.get<RouteDto>('assets/mock/json/coords.json')
    }

    login(username, password): Observable<User> {
        return this.http.get<User>('assets/mock/json/user.json')
    }

    logout() {
    }

}

