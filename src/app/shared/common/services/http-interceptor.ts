import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse }   from '@angular/common/http';
import { Injectable } from "@angular/core"
import { Observable, of } from "rxjs";
import { tap, catchError } from "rxjs/operators";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
    constructor() {}
intercept(
        req: HttpRequest<any>,
        next: HttpHandler
      ): Observable<HttpEvent<any>> {
    
        return next.handle(req).pipe(
            tap(evt => {
                if (evt instanceof HttpResponse) {
                    if(evt.body && evt.body.success){

                    }
                }
            }),
            catchError((err: any) => {
                
                switch(err.messageId){
                    case "PACK_INACTIVE":

                        break;
                    default:
                        console.log("error no identificado");
                        break;
                }
                return of(err);
            }));
    
      }
      
}