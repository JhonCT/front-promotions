export interface IStore {
  storeId?: string;
  name?: string;
  description?: string;
}

export class Store {
  storeId = '';
  name = '';
  description = '';

  constructor(model?) {
    Object.assign(this, model);
  }
}

