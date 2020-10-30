import { IPlayer } from './players.interface';
import { Injectable } from '@angular/core';
import { HttpClientService } from '@common/services/http-client.service';
import { ApiNames } from 'app/config/apis.enum';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  SUBJECT = 'players';

  constructor(
    private http: HttpClientService,
  ) { }

  items({ headers = [] }) {
    return this.http.get<IPlayer>({
      nameAPI: ApiNames.players,
      urlOrPath: `/${this.SUBJECT}`,
      headers,
      loadingOverlay: true,
      addCredentials: true,
    });
  }

  item({ id, headers = [] }) {
    return this.http.get<IPlayer>({
      nameAPI: ApiNames.players,
      urlOrPath: `/${this.SUBJECT}/${id}`,
      headers,
      loadingOverlay: true,
      addCredentials: true,
    });
  }

  newItem({ headers = [], body }) {
    return this.http.post<IPlayer>({
      nameAPI: ApiNames.players,
      urlOrPath: `/${this.SUBJECT}`,
      headers,
      body,
      loadingOverlay: true,
      addCredentials: true,
    });
  }

  updItem({ id, headers = [], body }) {
    return this.http.patch<IPlayer>({
      nameAPI: ApiNames.players,
      urlOrPath: `/${this.SUBJECT}/${id}`,
      headers,
      body,
      loadingOverlay: true,
      addCredentials: true,
    });
  }

  activate({ id, headers = [], body = {} }) {
    return this.http.patch<IPlayer>({
      nameAPI: ApiNames.players,
      urlOrPath: `/${this.SUBJECT}/${id}/activate`,
      headers,
      body,
      loadingOverlay: true,
      addCredentials: true,
    });
  }

  deactivateItem({ id, headers = [], body = {} }) {
    return this.http.patch<IPlayer>({
      nameAPI: ApiNames.players,
      urlOrPath: `/${this.SUBJECT}/${id}/deactivate`,
      headers,
      body,
      loadingOverlay: true,
      addCredentials: true,
    });
  }
}
