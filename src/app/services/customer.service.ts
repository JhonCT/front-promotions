import { ICustomer } from './../models/customer.interface';
import { Injectable } from '@angular/core';
import { HttpClientService } from 'app/shared/common/services/http-client.service';
import { ApiNames } from 'app/config/apis.enum';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  SUBJECT = 'customers';

  constructor(
    private http: HttpClientService,
  ) { }

  items({ headers = [] }) {
    return this.http.get<ICustomer>({
      nameAPI: ApiNames.users,
      urlOrPath: `/${this.SUBJECT}`,
      headers,
      loadingOverlay: true,
      addCredentials: true,
    });
  }

  activate({ id, headers = [], body = {} }) {
    return this.http.patch<ICustomer>({
      nameAPI: ApiNames.users,
      urlOrPath: `/${this.SUBJECT}/${id}/activate`,
      headers,
      body,
      loadingOverlay: true,
      addCredentials: true,
    });
  }

  deactivateItem({ id, headers = [], body = {} }) {
    return this.http.patch<ICustomer>({
      nameAPI: ApiNames.users,
      urlOrPath: `/${this.SUBJECT}/${id}/deactivate`,
      headers,
      body,
      loadingOverlay: true,
      addCredentials: true,
    });
  }
}
