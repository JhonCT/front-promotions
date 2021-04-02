export enum Actions {
}

export const ReportForProvidersTableConfig = {
  listActions: () => {
    return {
    };
  },
  dataTable: {
    tableId: 'REPORTS',
    columns: [
      { header: 'ID', align: 'left', key: 'txId', width: '20', show: true },
      { header: 'Fecha', align: 'left', key: 'day', width: '80', show: true },
      { header: 'Tienda', align: 'left', key: 'storeId', width: '100', show: true },
      { header: 'Proveedores', align: 'left', key: 'providerId', width: '120', show: true },
      { header: 'Players', align: 'right', key: 'players', width: '80', show: true },
      { header: 'Player', align: 'left', key: 'playerId', width: '80', show: true },
      { header: 'Juegos', align: 'right', key: 'games', width: '80', show: true },
      { header: 'Juego', align: 'left', key: 'gameId', width: '80', show: true },
      { header: '# Coin In', align: 'right', key: 'coinInCounter', width: '100', show: true },
      { header: '$ Coin In', align: 'right', key: 'coinInAmount', width: '100', show: true },
      { header: '# Coin Out', align: 'right', key: 'coinOutCounter', width: '100', show: true },
      { header: '$ Coin Out', align: 'right', key: 'coinOutAmount', width: '100', show: true },
      { header: '$ Net Win', align: 'right', key: 'netWin', width: '100', show: true },
    ],
    columnsForStoresAndProviders: [
      { header: 'ID', align: 'left', key: 'txId', width: '20', show: true },
      { header: 'Tienda', align: 'left', key: 'storeId', width: '100', show: true },
      { header: 'Proveedores', align: 'left', key: 'providerId', width: '120', show: true },
      { header: 'Players', align: 'right', key: 'players', width: '80', show: true },
      { header: 'Juegos', align: 'right', key: 'games', width: '80', show: true },
      { header: '# Coin In', align: 'right', key: 'coinInCounter', width: '100', show: true },
      { header: '$ Coin In', align: 'right', key: 'coinInAmount', width: '100', show: true },
      { header: '# Coin Out', align: 'right', key: 'coinOutCounter', width: '100', show: true },
      { header: '$ Coin Out', align: 'right', key: 'coinOutAmount', width: '100', show: true },
      { header: '$ Net Win', align: 'right', key: 'netWin', width: '100', show: true },
    ],
    columnsForStoresAndProvidersDayByDay: [
      { header: 'ID', align: 'left', key: 'txId', width: '20', show: true },
      { header: 'Fecha', align: 'left', key: 'day', width: '80', show: true },
      { header: 'Tienda', align: 'left', key: 'storeId', width: '100', show: true },
      { header: 'Proveedores', align: 'left', key: 'providerId', width: '120', show: true },
      { header: 'Players', align: 'right', key: 'players', width: '80', show: true },
      { header: 'Juegos', align: 'right', key: 'games', width: '80', show: true },
      { header: '# Coin In', align: 'right', key: 'coinInCounter', width: '100', show: true },
      { header: '$ Coin In', align: 'right', key: 'coinInAmount', width: '100', show: true },
      { header: '# Coin Out', align: 'right', key: 'coinOutCounter', width: '100', show: true },
      { header: '$ Coin Out', align: 'right', key: 'coinOutAmount', width: '100', show: true },
      { header: '$ Net Win', align: 'right', key: 'netWin', width: '100', show: true },
    ],
    columnsForStoresAndGames: [
      { header: 'ID', align: 'left', key: 'txId', width: '20', show: true },
      { header: 'Tienda', align: 'left', key: 'storeId', width: '100', show: true },
      { header: 'Juego', align: 'left', key: 'gameId', width: '100', show: true },
      { header: 'Proveedores', align: 'left', key: 'providerId', width: '120', show: true },
      { header: 'Players', align: 'right', key: 'players', width: '80', show: true },
      { header: '# Coin In', align: 'right', key: 'coinInCounter', width: '100', show: true },
      { header: '$ Coin In', align: 'right', key: 'coinInAmount', width: '100', show: true },
      { header: '# Coin Out', align: 'right', key: 'coinOutCounter', width: '100', show: true },
      { header: '$ Coin Out', align: 'right', key: 'coinOutAmount', width: '100', show: true },
      { header: '$ Net Win', align: 'right', key: 'netWin', width: '100', show: true },
    ],
    columnsForStoresAndGamesDayByDay: [
      { header: 'ID', align: 'left', key: 'txId', width: '20', show: true },
      { header: 'Fecha', align: 'left', key: 'day', width: '80', show: true },
      { header: 'Tienda', align: 'left', key: 'storeId', width: '100', show: true },
      { header: 'Juego', align: 'left', key: 'gameId', width: '100', show: true },
      { header: 'Proveedores', align: 'left', key: 'providerId', width: '120', show: true },
      { header: 'Players', align: 'right', key: 'players', width: '80', show: true },
      { header: '# Coin In', align: 'right', key: 'coinInCounter', width: '100', show: true },
      { header: '$ Coin In', align: 'right', key: 'coinInAmount', width: '100', show: true },
      { header: '# Coin Out', align: 'right', key: 'coinOutCounter', width: '100', show: true },
      { header: '$ Coin Out', align: 'right', key: 'coinOutAmount', width: '100', show: true },
      { header: '$ Net Win', align: 'right', key: 'netWin', width: '100', show: true },
    ],
    columnsForStoresAndPlayers: [
      { header: 'ID', align: 'left', key: 'txId', width: '20', show: true },
      { header: 'Tienda', align: 'left', key: 'storeId', width: '100', show: true },
      { header: 'Player', align: 'left', key: 'playerId', width: '100', show: true },
      { header: 'Proveedores', align: 'left', key: 'providerId', width: '120', show: true },
      { header: 'Juego', align: 'right', key: 'games', width: '80', show: true },
      { header: '# Coin In', align: 'right', key: 'coinInCounter', width: '100', show: true },
      { header: '$ Coin In', align: 'right', key: 'coinInAmount', width: '100', show: true },
      { header: '# Coin Out', align: 'right', key: 'coinOutCounter', width: '100', show: true },
      { header: '$ Coin Out', align: 'right', key: 'coinOutAmount', width: '100', show: true },
      { header: '$ Net Win', align: 'right', key: 'netWin', width: '100', show: true },
    ],
    columnsForStoresAndPlayersDayByDay: [
      { header: 'ID', align: 'left', key: 'txId', width: '20', show: true },
      { header: 'Fecha', align: 'left', key: 'day', width: '80', show: true },
      { header: 'Tienda', align: 'left', key: 'storeId', width: '100', show: true },
      { header: 'Player', align: 'left', key: 'playerId', width: '100', show: true },
      { header: 'Proveedores', align: 'left', key: 'providerId', width: '120', show: true },
      { header: 'Juego', align: 'right', key: 'games', width: '80', show: true },
      { header: '# Coin In', align: 'right', key: 'coinInCounter', width: '100', show: true },
      { header: '$ Coin In', align: 'right', key: 'coinInAmount', width: '100', show: true },
      { header: '# Coin Out', align: 'right', key: 'coinOutCounter', width: '100', show: true },
      { header: '$ Coin Out', align: 'right', key: 'coinOutAmount', width: '100', show: true },
      { header: '$ Net Win', align: 'right', key: 'netWin', width: '100', show: true },
    ],
    columnsForProviders: [
      { header: 'ID', align: 'left', key: 'txId', width: '20', show: true },
      { header: 'Proveedores', align: 'left', key: 'providerId', width: '120', show: true },
      { header: 'Players', align: 'left', key: 'players', width: '100', show: true },
      { header: 'Juegos', align: 'right', key: 'games', width: '80', show: true },
      { header: '# Coin In', align: 'right', key: 'coinInCounter', width: '100', show: true },
      { header: '$ Coin In', align: 'right', key: 'coinInAmount', width: '100', show: true },
      { header: '# Coin Out', align: 'right', key: 'coinOutCounter', width: '100', show: true },
      { header: '$ Coin Out', align: 'right', key: 'coinOutAmount', width: '100', show: true },
      { header: '$ Net Win', align: 'right', key: 'netWin', width: '100', show: true },
    ],
    columnsForProvidersDayByDay: [
      { header: 'ID', align: 'left', key: 'txId', width: '20', show: true },
      { header: 'Fecha', align: 'left', key: 'day', width: '80', show: true },
      { header: 'Proveedores', align: 'left', key: 'providerId', width: '120', show: true },
      { header: 'Players', align: 'left', key: 'players', width: '100', show: true },
      { header: 'Juegos', align: 'right', key: 'games', width: '80', show: true },
      { header: '# Coin In', align: 'right', key: 'coinInCounter', width: '100', show: true },
      { header: '$ Coin In', align: 'right', key: 'coinInAmount', width: '100', show: true },
      { header: '# Coin Out', align: 'right', key: 'coinOutCounter', width: '100', show: true },
      { header: '$ Coin Out', align: 'right', key: 'coinOutAmount', width: '100', show: true },
      { header: '$ Net Win', align: 'right', key: 'netWin', width: '100', show: true },
    ],
    columnsForGames: [
      { header: 'ID', align: 'left', key: 'txId', width: '20', show: true },
      { header: 'Juego', align: 'right', key: 'gameId', width: '80', show: true },
      { header: 'Proveedor', align: 'left', key: 'providerId', width: '120', show: true },
      { header: 'Players', align: 'left', key: 'players', width: '100', show: true },
      { header: '# Coin In', align: 'right', key: 'coinInCounter', width: '100', show: true },
      { header: '$ Coin In', align: 'right', key: 'coinInAmount', width: '100', show: true },
      { header: '# Coin Out', align: 'right', key: 'coinOutCounter', width: '100', show: true },
      { header: '$ Coin Out', align: 'right', key: 'coinOutAmount', width: '100', show: true },
      { header: '$ Net Win', align: 'right', key: 'netWin', width: '100', show: true },
    ],
    columnsForGamesDayByDay: [
      { header: 'ID', align: 'left', key: 'txId', width: '20', show: true },
      { header: 'Fecha', align: 'left', key: 'day', width: '80', show: true },
      { header: 'Juego', align: 'right', key: 'gameId', width: '80', show: true },
      { header: 'Proveedor', align: 'left', key: 'providerId', width: '120', show: true },
      { header: 'Players', align: 'left', key: 'players', width: '100', show: true },
      { header: '# Coin In', align: 'right', key: 'coinInCounter', width: '100', show: true },
      { header: '$ Coin In', align: 'right', key: 'coinInAmount', width: '100', show: true },
      { header: '# Coin Out', align: 'right', key: 'coinOutCounter', width: '100', show: true },
      { header: '$ Coin Out', align: 'right', key: 'coinOutAmount', width: '100', show: true },
      { header: '$ Net Win', align: 'right', key: 'netWin', width: '100', show: true },
    ],
    columnsForPlayers: [
      { header: 'ID', align: 'left', key: 'txId', width: '20', show: true },
      { header: 'Player', align: 'left', key: 'playerId', width: '100', show: true },
      { header: 'Proveedor', align: 'left', key: 'providerId', width: '120', show: true },
      { header: 'Juegos', align: 'right', key: 'games', width: '80', show: true },
      { header: '# Coin In', align: 'right', key: 'coinInCounter', width: '100', show: true },
      { header: '$ Coin In', align: 'right', key: 'coinInAmount', width: '100', show: true },
      { header: '# Coin Out', align: 'right', key: 'coinOutCounter', width: '100', show: true },
      { header: '$ Coin Out', align: 'right', key: 'coinOutAmount', width: '100', show: true },
      { header: '$ Net Win', align: 'right', key: 'netWin', width: '100', show: true },
    ],
    columnsForPlayersDayByDay: [
      { header: 'ID', align: 'left', key: 'txId', width: '20', show: true },
      { header: 'Fecha', align: 'left', key: 'day', width: '80', show: true },
      { header: 'Player', align: 'left', key: 'playerId', width: '100', show: true },
      { header: 'Proveedor', align: 'left', key: 'providerId', width: '120', show: true },
      { header: 'Juegos', align: 'right', key: 'games', width: '80', show: true },
      { header: '# Coin In', align: 'right', key: 'coinInCounter', width: '100', show: true },
      { header: '$ Coin In', align: 'right', key: 'coinInAmount', width: '100', show: true },
      { header: '# Coin Out', align: 'right', key: 'coinOutCounter', width: '100', show: true },
      { header: '$ Coin Out', align: 'right', key: 'coinOutAmount', width: '100', show: true },
      { header: '$ Net Win', align: 'right', key: 'netWin', width: '100', show: true },
    ],
    columnsForStores: [
      { header: 'ID', align: 'left', key: 'txId', width: '20', show: true },
      { header: 'Tienda', align: 'left', key: 'storeId', width: '100', show: true },
      { header: 'Players', align: 'left', key: 'players', width: '100', show: true },
      { header: 'Juegos', align: 'right', key: 'games', width: '80', show: true },
      { header: '# Coin In', align: 'right', key: 'coinInCounter', width: '100', show: true },
      { header: '$ Coin In', align: 'right', key: 'coinInAmount', width: '100', show: true },
      { header: '# Coin Out', align: 'right', key: 'coinOutCounter', width: '100', show: true },
      { header: '$ Coin Out', align: 'right', key: 'coinOutAmount', width: '100', show: true },
      { header: '$ Net Win', align: 'right', key: 'netWin', width: '100', show: true },
    ],
    columnsForStoresDayByDay: [
      { header: 'ID', align: 'left', key: 'txId', width: '20', show: true },
      { header: 'Fecha', align: 'left', key: 'day', width: '80', show: true },
      { header: 'Tienda', align: 'left', key: 'storeId', width: '100', show: true },
      { header: 'Players', align: 'left', key: 'players', width: '100', show: true },
      { header: 'Juegos', align: 'right', key: 'games', width: '80', show: true },
      { header: '# Coin In', align: 'right', key: 'coinInCounter', width: '100', show: true },
      { header: '$ Coin In', align: 'right', key: 'coinInAmount', width: '100', show: true },
      { header: '# Coin Out', align: 'right', key: 'coinOutCounter', width: '100', show: true },
      { header: '$ Coin Out', align: 'right', key: 'coinOutAmount', width: '100', show: true },
      { header: '$ Net Win', align: 'right', key: 'netWin', width: '100', show: true },
    ],
    actionColumn: false,
    indexColumn: false,
    pageSizeOptions: [10, 20, 50, 100],
    pageSizeDefault: 10,
    showFilters: false,
    showBtnReload: false,
    showBtnDownload: false,
    showBtnAdd: false,
    showChooseColumns: true,
    showGroupByOptions: true,
    showTotals: true,
  },
  active: {
    0: {
      value: '0',
      label: 'Inactivo',
      key: 'active',
    },
    1: {
      value: '1',
      label: 'Activo',
      key: 'active',
    },
  },
};