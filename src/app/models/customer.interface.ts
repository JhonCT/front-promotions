import { IUser, User } from './../modules/users/users.interface';
import { IPlayer, Player } from './../modules/players/players.interface';
export interface ICustomer {
  customerId?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  active?: string;
  player?: IPlayer;
  user?: IUser;
}

export class Customer {
  customerId = '';
  firstName = '';
  lastName = '';
  email = '';
  username = '';
  active = '';
  player = new Player();
  user = new User();
  constructor(model?) {
    Object.assign(this, model);
    Object.assign(this.player, model ? model.player : {});
    Object.assign(this.user, model ? model.user : {});
  }
}
