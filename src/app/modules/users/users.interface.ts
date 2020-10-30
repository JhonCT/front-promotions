export interface IUser {
  userId?: string;
  customerId?: string;
  profileId?: string;
  storeId?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  changePassword?: string;
  active?: string;
  passText?: string;
}

export class User {
  userId = '';
  customerId = '';
  profileId = '';
  storeId = '';
  email = '';
  firstName = '';
  lastName = '';
  changePassword = '';
  active = '';
  passText = '';

  constructor(model?) {
    Object.assign(this, model);
  }
}

