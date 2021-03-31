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

  itemsPromo({ headers = [] }) {
    return this.http.get<IPromotions>({
      nameAPI: ApiNames.promotions,
      urlOrPath: `/${this.SUBJECT_PROMOS}`,
      headers,
      loadingOverlay: true,
      addCredentials: true,
      addApiKey: true,
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

  itemPromo({ id, headers = [] }) {
    return this.http.get<IPromotions>({
      nameAPI: ApiNames.promotions,
      urlOrPath: `/${this.SUBJECT_PROMOS}/${id}`
    })
  }

  updItemPromo({ id, headers = [], body }) {
    return this.http.patch<IPromotions>({
      nameAPI: ApiNames.promotions,
      urlOrPath: `/${this.SUBJECT_PROMOS}/${id}`,
      headers,
      body,
      loadingOverlay: true,
      addCredentials: true
    })
  }

  activatePromo({ id, headers = [], body = {} }) {
    return this.http.patch<IPromotions>({
      nameAPI: ApiNames.promotions,
      urlOrPath: `/${this.SUBJECT_PROMOS}/${id}/activate`,
      headers,
      body,
      loadingOverlay: true,
      addCredentials: true,
    });
  }

  deactivateItemPromo({ id, headers = [], body = {} }) {
    return this.http.patch<IPromotions>({
      nameAPI: ApiNames.promotions,
      urlOrPath: `/${this.SUBJECT_PROMOS}/${id}/deactivate`,
      headers,
      body,
      loadingOverlay: true,
      addCredentials: true,
    });
  }

  itemsType({ headers = [] }) {
    return this.http.get<IPromotions>({
      nameAPI: ApiNames.promotions,
      urlOrPath: `/${this.SUBJECT_PROMOS}`,
      headers,
      loadingOverlay: true,
      addCredentials: true
    });
  }

  newItemType({ headers = [], body }) {
    return this.http.post<IPromotions>({
      nameAPI: ApiNames.promotions,
      urlOrPath: `/${this.SUBJECT_PROMOS}`,
      headers,
      body,
      loadingOverlay: true,
      addCredentials: true
    });
  }

  itemType({ id, headers = [] }) {
    return this.http.get<IPromotions>({
      nameAPI: ApiNames.promotions,
      urlOrPath: `/${this.SUBJECT_PROMOS}/${id}`
    })
  }

  updItemType({ id, headers = [], body }) {
    return this.http.patch<IPromotions>({
      nameAPI: ApiNames.promotions,
      urlOrPath: `/${this.SUBJECT_PROMOS}/${id}`,
      headers,
      body,
      loadingOverlay: true,
      addCredentials: true
    })
  }

  activateType({ id, headers = [], body = {} }) {
    return this.http.patch<IPromotions>({
      nameAPI: ApiNames.promotions,
      urlOrPath: `/${this.SUBJECT_PROMOS}/${id}/activate`,
      headers,
      body,
      loadingOverlay: true,
      addCredentials: true,
    });
  }

  deactivateItemType({ id, headers = [], body = {} }) {
    return this.http.patch<IPromotions>({
      nameAPI: ApiNames.promotions,
      urlOrPath: `/${this.SUBJECT_PROMOS}/${id}/deactivate`,
      headers,
      body,
      loadingOverlay: true,
      addCredentials: true,
    });
  }

}
