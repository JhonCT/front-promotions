import { catchError } from 'rxjs/operators';
import { IStoreManager } from './store-managers.interface';
import { Injectable } from '@angular/core';
import { HttpClientService } from '@common/services/http-client.service';
import { ApiNames } from 'app/config/apis.enum';
import { throwError } from 'rxjs';
import { ToasterService } from '@core/services/toaster.service';

@Injectable({
  providedIn: 'root'
})
export class StoreManagersService {

  SUBJECT = 'store-managers';

  constructor(
    private http: HttpClientService,
    private toast: ToasterService,
  ) { }

  items({ headers = [] }) {
    return this.http.get<IStoreManager>({
      nameAPI: ApiNames.security,
      urlOrPath: `/${this.SUBJECT}`,
      headers,
      loadingOverlay: true,
      addCredentials: true,
    });
  }

  item({ id, headers = [] }) {
    return this.http.get<IStoreManager>({
      nameAPI: ApiNames.security,
      urlOrPath: `/${this.SUBJECT}/${id}`,
      headers,
      loadingOverlay: true,
      addCredentials: true,
    });
  }

  newItem({ headers = [], body }) {
    return this.http.post<IStoreManager>({
      nameAPI: ApiNames.security,
      urlOrPath: `/${this.SUBJECT}`,
      headers,
      body,
      loadingOverlay: true,
      addCredentials: true,
    });
  }

  updItem({ id, headers = [], body }) {
    return this.http.patch<IStoreManager>({
      nameAPI: ApiNames.security,
      urlOrPath: `/${this.SUBJECT}/${id}`,
      headers,
      body,
      loadingOverlay: true,
      addCredentials: true,
      showErrToastMsg: false,
    }).pipe(
      catchError(err => {
        this.toast.error({ message: err.message });
        return throwError(err);
      })
    );
  }

  activate({ id, headers = [], body = {} }) {
    return this.http.patch<IStoreManager>({
      nameAPI: ApiNames.security,
      urlOrPath: `/${this.SUBJECT}/${id}/activate`,
      headers,
      body,
      loadingOverlay: true,
      addCredentials: true,
    });
  }

  deactivateItem({ id, headers = [], body = {} }) {
    return this.http.patch<IStoreManager>({
      nameAPI: ApiNames.security,
      urlOrPath: `/${this.SUBJECT}/${id}/deactivate`,
      headers,
      body,
      loadingOverlay: true,
      addCredentials: true,
    });
  }
}
