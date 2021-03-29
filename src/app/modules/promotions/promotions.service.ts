import { Injectable } from '@angular/core';
import { ApiNames } from 'app/config/apis.enum';
import { IPromotions } from 'app/models/promotions.interface';
import { HttpClientService } from 'app/shared/common/services/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionsService {

  constructor(
    private http: HttpClientService
  ) { }

  SUBJECT_PROMOS: String = 'promos';
  SUBJECT_TYPES: String = 'types';

  itemsPromos({ headers = [] }) {
    return this.http.get<IPromotions>({
      nameAPI: ApiNames.promotions,
      urlOrPath: `/${this.SUBJECT_PROMOS}`,
      headers,
      loadingOverlay: true,
      addCredentials: true
    });
  }

  newItemPromo({ headers = [], body }) {
    return this.http.post<IPromotions>({
      nameAPI: ApiNames.promotions,
      urlOrPath: `/${this.SUBJECT_PROMOS}`,
      headers,
      body,
      loadingOverlay: true,
      addCredentials: true
    });
  }

}
