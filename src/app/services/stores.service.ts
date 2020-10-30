import { Injectable } from '@angular/core';
import { ApiNames } from 'app/config/apis.enum';
import { IStore } from 'app/models/store.interface';
import { HttpClientService } from 'app/shared/common/services/http-client.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StoresService {

  SUBJECT = 'stores';
  STORE_MANAGERS = 'store-managers';

  constructor(
    private http: HttpClientService
  ) { }

  items({ headers = [] }) {
    return this.http.get<IStore>({
      nameAPI: ApiNames.security,
      urlOrPath: `/${this.SUBJECT}`,
      headers,
      loadingOverlay: true,
      addCredentials: true,
    });
  }

  /**
   * tiendas administradas por mi
   */
  storesManaged({ headers = [] }) {
    return this.http.get<IStore>({
      nameAPI: ApiNames.security,
      urlOrPath: `/${this.STORE_MANAGERS}/managed`,
      headers,
      loadingOverlay: true,
      addCredentials: true,
    }).pipe(
      map(result => result.data.items)
    );
  }
}
