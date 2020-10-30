import { Customer, ICustomer } from './../../models/customer.interface';
export interface IPlayer {
  playerId?: string;
  coins?: string;
  points?: string;
  active?: string;
  ip?: string;
}

export class Player {
  playerId = '';
  coins = '';
  points = '';
  active = '';
  ip = '';

  constructor(model?) {
    Object.assign(this, model);
  }
}

