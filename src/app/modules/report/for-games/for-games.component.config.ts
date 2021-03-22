export enum Actions {
}

export const ReportForGamesTableConfig = {
  listActions: () => {
    return {
    };
  },
  dataTable: {
    tableId: 'REPORT_FOR_GAMES',
    columns: [
      { header: 'ID', align: 'left', key: 'txId', width: '20', show: false },
      { header: 'Fecha', align: 'left', key: 'day', width: '80', show: true },
      { header: 'Tienda', align: 'left', key: 'storeId', width: '100', show: true },
      { header: 'Juego', align: 'right', key: 'gameId', width: '120', show: true },
      { header: 'Proveedores', align: 'left', key: 'providerId', width: '120', show: true },
      { header: 'Players', align: 'right', key: 'players', width: '80', show: true },
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
    showBtnDownload: true,
    showBtnAdd: false,
    showChooseColumns: true,
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
