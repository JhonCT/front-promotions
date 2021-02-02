export enum Actions {
  edit = 'edit',
  active = 'active',
  deactive = 'deactive',
  resetPass = 'resetPass',
  addRemovePoints = 'addRemovePoints',
}

export const playersTableConfig = {
  listActions: () => {
    return {
      // edit: {
      //   action: Actions.edit,
      //   icon: 'edit',
      //   color: '#2ca3c4',
      //   label: 'Editar',
      //   function: 'handleEdit',
      //   show: true,
      // },
      active: {
        action: Actions.active,
        icon: 'adjust',
        color: '#ed4955',
        label: 'Activar',
        function: 'handleActive',
        show: true,
      },
      deactive: {
        action: Actions.deactive,
        icon: 'adjust',
        color: '#5dcb94',
        label: 'Desactivar',
        function: 'handleDeactive',
        show: true,
      },
      addRemovePoints: {
        action: Actions.addRemovePoints,
        icon: 'local_atm',
        color: '#5dcb94',
        label: 'Agregar o quitar Coins',
        function: 'handleAddOrRemoveCoins',
        show: true,
      },
    };
  },
  dataTable: {
    tableId: 'PLAYERS',
    columns: [
      { header: 'ID', align: 'left', key: 'customerId', width: '120', show: true },
      { header: 'Nombres', align: 'left', key: 'firstName', width: '120', show: true },
      { header: 'Apellidos', align: 'left', key: 'lastName', width: '120', show: true },
      { header: 'Correo', align: 'left', key: 'email', width: '100', show: true },
      { header: 'Username', align: 'left', key: 'username', width: '100', show: true },
      { header: 'Moneda', align: 'left', key: 'currencyId', width: '100', show: false },
      { header: 'Balance', align: 'right', key: 'coins', width: '80', show: true },
      { header: 'ID de la tienda', align: 'left', key: 'storeId', width: '80', show: true },
      { header: 'Telefono', align: 'left', key: 'phone', width: '100', show: false },
      { header: 'Documento', align: 'left', key: 'identification', width: '100', show: false },
      { header: 'Direccion', align: 'left', key: 'address', width: '200', show: false },
      { header: 'Estado', align: 'left', key: 'active', width: '80', show: true },
      { header: 'Creado en', align: 'left', key: 'insDatetime', width: '100', show: false },
    ],
    actionColumn: true,
    indexColumn: true,
    pageSizeOptions: [10, 20, 50, 100],
    pageSizeDefault: 20,
    pageIndex: 0,
    showFilters: true,
    showBtnReload: true,
    showBtnDownload: false,
    showBtnAdd: true,
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
