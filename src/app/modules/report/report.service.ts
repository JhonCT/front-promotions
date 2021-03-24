import { Injectable } from '@angular/core';
import { ApiNames } from 'app/config/apis.enum';
import { HttpClientService } from 'app/shared/common/services/http-client.service';
import { IProvider, IReport, IStore, ICustomer } from './report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  SUBJECT: String = 'reports';

  constructor(
    private http: HttpClientService
  ) { }

  reports({ headers = [] }) {
    return this.http.get<IReport>({
      nameAPI: ApiNames.reports,
      urlOrPath: `/${this.SUBJECT}`,
      headers,
      loadingOverlay: true,
      addCredentials: true,
    });
  }

  reportsOfOneDay({ headers = [] }) {
    return this.http.get<IReport>({
      nameAPI: ApiNames.reports,
      urlOrPath: `/${this.SUBJECT}/of-one-day`,
      headers,
      loadingOverlay: true,
      addCredentials: true,

    })
  }

  reportsGroupByResource({ headers = [] }) {
    return this.http.get<IReport>({
      nameAPI: ApiNames.reports,
      urlOrPath: `/${this.SUBJECT}/find`,
      headers,
      loadingOverlay: true,
      addCredentials: true,
    });
  }

  reportsFind({ headers = [] }) {
    return this.http.get<IReport>({
      nameAPI: ApiNames.reports,
      urlOrPath: `/${this.SUBJECT}/find`,
      headers,
      loadingOverlay: true,
      addCredentials: true,
    });
  }

  stores({ headers = [] }) {
    return this.http.get<IStore>({
      nameAPI: ApiNames.reports,
      urlOrPath: `/${this.SUBJECT}/stores`,
      headers,
      loadingOverlay: true,
      addCredentials: true
    })
  }

  providers({ headers = [] }) {
    return this.http.get<IProvider>({
      nameAPI: ApiNames.reports,
      urlOrPath: `/${this.SUBJECT}/providers`,
      headers,
      addCredentials: true
    })
  }

  customer({ headers = [] }) {
    return this.http.get<ICustomer>({
      nameAPI: ApiNames.reports,
      urlOrPath: `/${this.SUBJECT}/customer`,
      headers,
      addCredentials: true
    })
  }
}

