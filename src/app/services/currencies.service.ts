import { ICurrency } from './../models/currency.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { ApiNames } from 'app/config/apis.enum';
import { HttpClientService } from 'app/shared/common/services/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {

  SUBJECT = '';

  constructor(
    private http: HttpClientService,
  ) { }

  currencies({ headers = [], countryId, langId }) {
    return this.http.get<ICurrency>({
      nameAPI: ApiNames.multilangs,
      urlOrPath: `/currencies/country/${countryId}/langs/${langId}/customer`,
      headers,
      loadingOverlay: true,
      addCredentials: true,
    });
  }
}
