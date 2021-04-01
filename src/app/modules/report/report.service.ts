import { Injectable } from '@angular/core';
import { ApiNames } from 'app/config/apis.enum';
import { HttpClientService } from 'app/shared/common/services/http-client.service';
import { IPlayer } from '../players/players.interface';
import { IProvider, IReport, IStore, ICustomer, IGame } from './report';

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
      addCredentials: true,

    })
  }

  reportsGroupByResource({ headers = [] }) {
    return this.http.get<IReport>({
      nameAPI: ApiNames.reports,
      urlOrPath: `/${this.SUBJECT}/find`,
      headers,
      addCredentials: true,
    });
  }

  reportsFind({ headers = [] }) {
    return this.http.get<IReport>({
      nameAPI: ApiNames.reports,
      urlOrPath: `/${this.SUBJECT}/find`,
      headers,
      addCredentials: true,
    });
  }

  stores({ headers = [] }) {
    return this.http.get<IStore>({
      nameAPI: ApiNames.reports,
      urlOrPath: `/${this.SUBJECT}/stores`,
      headers,
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

  games({ headers = []}) {
    return this.http.get<IGame>({
      nameAPI: ApiNames.reports,
      urlOrPath: `/${this.SUBJECT}/games`,
      headers,
      addCredentials: true,
    })
  }

  players({ headers = []}) {
    return this.http.get<IPlayer>({
      nameAPI: ApiNames.reports,
      urlOrPath: `/${this.SUBJECT}/players`,
      headers,
      addCredentials: true,
    })
  }
}

