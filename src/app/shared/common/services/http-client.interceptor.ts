import { Injectable } from '@angular/core';

import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { SessionService } from 'app/modules/auth/session.service';
import { ToasterService } from '@core/services/toaster.service';

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {

  constructor(
    private _toast: ToasterService,
    private _sessionService: SessionService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      // map((event: HttpEvent<any>) => {
      //   if (event instanceof HttpResponse) {
      //     // console.log('event--->>>', event);
      //   }
      //   return event;
      // }),
      catchError((e: HttpErrorResponse) => {
        if (e.status == 401 && e.error) {
          let timeLapse = `${e.error.timeLapse.duration.toFixed(2)} ${e.error.timeLapse.durationLabel}`;
          this._sessionService.logoutInterceptor();
          this._toast.error({ message: e.error.message, timeLapse });
        }
        return throwError(e);
      }));
  }

}
