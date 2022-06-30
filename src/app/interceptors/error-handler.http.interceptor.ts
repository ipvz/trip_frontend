import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import logger from '../utils/logger';
import notifications from '../utils/notifications';


@Injectable()
export class ErrorHandlerHttpInterceptor implements HttpInterceptor {
    constructor() {
    }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const authReq = req.clone({
            headers: req.headers.set('Session', '123456789'),
        })

        req?.body ? logger.request(req.body) : null

        return next.handle(authReq).pipe(
            tap(
                (event) => {
                    if (event instanceof HttpResponse) {
                        logger.response(event.body)
                    }
                },
                (err) => {
                    if (err instanceof HttpErrorResponse) {
                        if (err.status == 401) {
                            logger.error(err)
                            notifications.showNotificationWarn("Необходимо авторизоваться")
                        }
                        notifications.showNotificationError(err?.message ? "Ошибка: " + err.message : "Неизвестная ошибка")
                    }
                }
            )
        )
    }


}
