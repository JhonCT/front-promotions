import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiNames } from 'app/config/apis.enum';
import { HttpClientService } from 'app/shared/common/services/http-client.service';
import { map } from 'rxjs/operators';
import { SessionService } from './auth/session.service';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(
    private http: HttpClientService,
    private sessionSvc: SessionService,
    private router: Router,
  ) { }

  privilegies({ headers = [], }) {
    return this.http.get({
      nameAPI: ApiNames.security,
      urlOrPath: `/privileges/info`,
      headers,
      loadingOverlay: false,
      addCredentials: true,
    });
  }

}
