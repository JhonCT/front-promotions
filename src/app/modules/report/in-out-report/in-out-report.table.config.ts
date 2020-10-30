
export enum Actions {
}

export const InOutReportTableConfig = {
  listActions: () => {
    return {
    };
  },
  dataTable: {
    tableId: 'REPORT_IN_OUT',
    columns: [
      { header: 'ID', align: 'left', key: 'txId', width: '120', show: true },
      { header: 'Tipo', align: 'left', key: 'type', width: '120', show: true },
      { header: 'Monto', align: 'right', key: 'amount', width: '120', show: true },
      { header: 'Nombres | cliente', align: 'left', key: 'customerNames', width: '120', show: true },
      { header: 'Email | cliente', align: 'left', key: 'customerEmail', width: '120', show: false },
      { header: 'Balance | Antes', align: 'right', key: 'coinsBefore', width: '100', show: true },
      { header: 'Balance | Despues', align: 'right', key: 'coins', width: '100', show: true },
      { header: 'Usuario |  BO', align: 'left', key: 'userNames', width: '100', show: false },
      { header: 'Estado', align: 'left', key: 'status', width: '80', show: false },
      { header: 'Fecha', align: 'left', key: 'insDatetime', width: '100', show: true },
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
