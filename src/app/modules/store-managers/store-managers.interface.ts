import { IStore, Store } from './../../models/store.interface';
import { IUser, User } from './../users/users.interface';
export interface IStoreManager {
  userStoreId?: string;
  userId?: string;
  storeId?: string;
  active?: string;
  user?: IUser;
  store?: IStore;
}

export class StoreManager {
  userStoreId = '';
  userId = '';
  storeId = '';
  active = '';
  user = new User();
  store = new Store();

  constructor(model?) {
    Object.assign(this, model);
    Object.assign(this.user, model ? model.user : {});
    Object.assign(this.store, model ? model.store : {});
  }
}

