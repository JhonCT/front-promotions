export interface IReport {
  txId?: Number;
  day?: String;
  storeId?: String;
  playerId?: String;
  gameId?: String;
  games?: String;
  players?: Number;
  providerId?: String;
  providers?: Number;
  coinInCounter?: Number;
  coinInAmount?: Number;
  coinOutCounter?: Number;
  coinOutAmount?: Number;
  netWin?: Number;
}

export class Report {
  txId = '';
  day = '';
  storeId = '';
  playerId = '';
  gameId = '';
  games = '';
  players = 0;
  providerId = '';
  providers = 0;
  coinInCounter = 0;
  coinInAmount = 0;
  coinOutCounter = 0;
  coinOutAmount = 0;
  netWin = 0;

  constructor(model?) {
    Object.assign(this, model);
  }
}

export interface IStore {
  storeId?: String;
  name?: String;
}

export class Store {
  storeId = ''
  name = ''

  constructor(model?) {
    Object.assign(this, model)
  }
}

export interface IProvider {
  providerId?: String;
  name?: String;
}

export class Provider {
  providerId = ''
  name = ''

  constructor(model?) {
    Object.assign(this, model)
  }
}

export interface ICustomer {
  playerId?: String;
  name?: String;
}

export class Customer {
  playerId = ''
  name = ''

  constructor(model?) {
    Object.assign(this, model)
  }
}

export interface IGame {
  gameId?: String;
  nameBack?: String;
  providerId?: String;
}

export class Game {
  playerId = '';
  nameBack = '';
  providerId = '';

  constructor(model?) {
    Object.assign(this, model)
  }
}

export interface IPlayer {
  playerId?: string;
  username?: string;
}

export class Player {
  playerId = '';
  username = '';

  constructor(model?) {
    Object.assign(this, model);
  }
}
