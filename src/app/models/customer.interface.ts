import { IUser, User } from './../modules/users/users.interface';
import { IPlayer, Player } from './../modules/players/players.interface';
export interface ICustomer {
  customerId?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  phone?: string;
  birthdate?: string;
  countryId?: string;
  userType?: string;
  active?: string;
  city?: string;
  address?: string;
  identId?: string;
  identification?: string;
  currencyId?: string;
  storeId?: string;
  player?: IPlayer;
  user?: IUser;
}

export class Customer {
  customerId = '';
  firstName = '';
  lastName = '';
  email = '';
  countryId = '';
  phone = '';
  birthdate = '';
  username = '';
  userType = '';
  active = '';
  city = '';
  address = '';
  storeId = '';
  identId = '';
  currencyId = '';
  identification = '';
  player = new Player();
  user = new User();
  constructor(model?) {
    Object.assign(this, model);
    Object.assign(this.player, model ? model.player : {});
    Object.assign(this.user, model ? model.user : {});
  }
}
