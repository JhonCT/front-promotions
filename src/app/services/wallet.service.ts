import { IPlayer } from './../modules/players/players.interface';
import { Injectable } from '@angular/core';
import { IStore } from 'app/models/store.interface';
import { HttpClientService } from 'app/shared/common/services/http-client.service';
import { ApiNames } from 'app/config/apis.enum';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  SUBJECT = 'wallet';

  constructor(private http: HttpClientService) {}

  credit({ playerId, headers = [], amount }) {
    return this.http.post<IPlayer>({
      nameAPI: ApiNames.wallet,
      urlOrPath: `/players/${playerId}/credit`,
      headers,
      body: {
        amount,
      },
      loadingOverlay: true,
      addCredentials: true,
    });
  }

  debit({ playerId, headers = [], amount }) {
    return this.http.post<IPlayer>({
      nameAPI: ApiNames.wallet,
      urlOrPath: `/players/${playerId}/debit`,
      headers,
      body: {
        amount,
      },
      loadingOverlay: true,
      addCredentials: true,
    });
  }

  inOutReport({ headers = [], storeId, dateFrom, dateEnd }) {
    return this.http.post<any>({
      nameAPI: ApiNames.wallet,
      urlOrPath: `/transactions/in-out-report`,
      headers,
      body: {
        storeId,
        dateFrom,
        dateEnd,
      },
      loadingOverlay: true,
      addCredentials: true,
    });
  }
}
