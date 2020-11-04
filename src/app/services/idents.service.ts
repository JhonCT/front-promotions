import { IIdent } from './../models/ident.interface';
import { HttpClientService } from './../shared/common/services/http-client.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiNames } from 'app/config/apis.enum';

@Injectable({
  providedIn: 'root',
})
export class IdentsService {
  constructor(
    private http: HttpClientService,
    ) {}

  idents({ headers = [], countryId, langId }){
    return this.http.get<IIdent>({
      nameAPI: ApiNames.multilangs,
      urlOrPath: `/idents/country/${countryId}/langs/${langId}/customer`,
      headers,
      loadingOverlay: false,
      addCredentials: true,
    });
  }
}
