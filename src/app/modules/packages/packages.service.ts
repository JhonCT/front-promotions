import { IPackage } from './package.interface';
import { HttpClientService } from './../../shared/common/services/http-client.service';
import { Injectable } from '@angular/core';
import { ApiNames } from 'app/config/apis.enum';

@Injectable({
  providedIn: 'root'
})
export class PackagesService {

  SUBJECT = 'packages';

  constructor(
    private http: HttpClientService,
  ) { }

  items({ headers = [] }) {
    return this.http.get<IPackage>({
      nameAPI: ApiNames.users,
      urlOrPath: `/${this.SUBJECT}`,
      headers,
      loadingOverlay: true,
      addCredentials: true,
    });
  }

  item({ id, headers = [] }) {
    return this.http.get<IPackage>({
      nameAPI: ApiNames.users,
      urlOrPath: `/${this.SUBJECT}/${id}`,
      headers,
      loadingOverlay: true,
      addCredentials: true,
    });
  }

  newItem({ headers = [], body }) {
    return this.http.post<IPackage>({
      nameAPI: ApiNames.users,
      urlOrPath: `/${this.SUBJECT}`,
      headers,
      body,
      loadingOverlay: true,
      addCredentials: true,
    });
  }

  updItem({ id, headers = [], body }) {
    return this.http.patch<IPackage>({
      nameAPI: ApiNames.users,
      urlOrPath: `/${this.SUBJECT}/${id}`,
      headers,
      body,
      loadingOverlay: true,
      addCredentials: true,
    });
  }

  activate({ id, headers = [], body = {} }) {
    return this.http.patch<IPackage>({
      nameAPI: ApiNames.users,
      urlOrPath: `/${this.SUBJECT}/${id}/activate`,
      headers,
      body,
      loadingOverlay: true,
      addCredentials: true,
    });
  }

  deactivateItem({ id, headers = [], body = {} }) {
    return this.http.patch<IPackage>({
      nameAPI: ApiNames.users,
      urlOrPath: `/${this.SUBJECT}/${id}/deactivate`,
      headers,
      body,
      loadingOverlay: true,
      addCredentials: true,
    });
  }
}
