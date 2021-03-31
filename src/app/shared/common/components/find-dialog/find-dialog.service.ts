import { Injectable } from '@angular/core';
import { ApiNames } from 'app/config/apis.enum';
import { IGame } from 'app/modules/report/report';
import { HttpClientService } from '../../services/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class FindDialogService {

  SUBJECT: String = 'reports'

  constructor(
    private http: HttpClientService
  ) { }

  games({ headers = [] }) {
    return this.http.get<IGame>({
      nameAPI: ApiNames.reports,
      urlOrPath: `/${this.SUBJECT}/games`,
      headers,
      addCredentials: true
    })
  }
}
