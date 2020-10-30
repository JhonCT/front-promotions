export interface IProfile {
  profileId?: string;
  name?: string;
  active?: number;

  insUserId?: string;
  insDate?: string;
  insDatetime?: string;
  insTimestamp?: string;
}

export class Profile {
  profileId = '';
  name = '';

  constructor(model?) {
    Object.assign(this, model);
  }
}

