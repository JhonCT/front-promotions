import { IProfile } from './../models/profiles.interface';
import { Injectable } from '@angular/core';
import { HttpClientService } from 'app/shared/common/services/http-client.service';
import { ApiNames } from 'app/config/apis.enum';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  SUBJECT = 'profiles';

  constructor(
    private http: HttpClientService
  ) { }

  items({ headers = [] }) {
    return this.http.get<IProfile>({
      nameAPI: ApiNames.security,
      urlOrPath: `/${this.SUBJECT}`,
      headers,
      loadingOverlay: true,
      addCredentials: true,
    });
  }
}
