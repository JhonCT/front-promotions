import { IUser } from './users.interface';
import { Injectable } from '@angular/core';
import { HttpClientService } from '@common/services/http-client.service';
import { ApiNames } from 'app/config/apis.enum';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  SUBJECT = 'user';

  constructor(
    private http: HttpClientService
  ) { }

  items({ headers = [] }) {
    return this.http.get<IUser>({
      nameAPI: ApiNames.security,
      urlOrPath: `/${this.SUBJECT}`,
      headers,
      loadingOverlay: true,
      addCredentials: true,
    });
  }

  item({ id, headers = [] }) {
    return this.http.get<IUser>({
      nameAPI: ApiNames.security,
      urlOrPath: `/${this.SUBJECT}/${id}`,
      headers,
      loadingOverlay: true,
      addCredentials: true,
    });
  }

  newItem({ headers = [], body }) {
    return this.http.post<IUser>({
      nameAPI: ApiNames.security,
      urlOrPath: `/${this.SUBJECT}`,
      headers,
      body,
      loadingOverlay: true,
      addCredentials: true,
    });
  }

  updItem({ id, headers = [], body }) {
    return this.http.patch<IUser>({
      nameAPI: ApiNames.security,
      urlOrPath: `/${this.SUBJECT}/${id}`,
      headers,
      body,
      loadingOverlay: true,
      addCredentials: true,
    });
  }

  activate({ id, headers = [], body = {} }) {
    return this.http.patch<IUser>({
      nameAPI: ApiNames.security,
      urlOrPath: `/${this.SUBJECT}/${id}/activate`,
      headers,
      body,
      loadingOverlay: true,
      addCredentials: true,
    });
  }

  deactivateItem({ id, headers = [], body = {} }) {
    return this.http.patch<IUser>({
      nameAPI: ApiNames.security,
      urlOrPath: `/${this.SUBJECT}/${id}/deactivate`,
      headers,
      body,
      loadingOverlay: true,
      addCredentials: true,
    });
  }

  resetPassword({ id, headers = [], body = {} }) {
    return this.http.patch<IUser>({
      nameAPI: ApiNames.security,
      urlOrPath: `/${this.SUBJECT}/${id}/reset-pass`,
      headers,
      body,
      loadingOverlay: true,
      addCredentials: true,
    });
  }
}

