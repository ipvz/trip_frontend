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
        logger.request(req.url, req.body)

        return next.handle(req).pipe(
            tap(
                (event) => {
                    if (event instanceof HttpResponse) {
                        logger.response(event.url, event.body)
                    }
                },
                (err) => {
                    logger.error(err)
                    if (err instanceof HttpErrorResponse) {
                        notifications.showNotificationError(err?.message ? "Error: " + err.message : "Unknown error")
                    }
                }
            )
        )
    }


}
