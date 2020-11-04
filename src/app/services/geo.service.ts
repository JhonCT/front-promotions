import { ICountry } from './../models/geo.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { HttpClientService } from 'app/shared/common/services/http-client.service';
import { ApiNames } from 'app/config/apis.enum';

@Injectable({
  providedIn: 'root'
})
export class GeoService {

  SUBJECT = 'countries';

  constructor(
    private http: HttpClientService,
  ) { }

  countries({ headers = [] }) {
    return this.http.get<ICountry>({
      nameAPI: ApiNames.multilangs,
      urlOrPath: `/${this.SUBJECT}/customer`,
      headers,
      loadingOverlay: true,
      addCredentials: true,
    });
  }
}
