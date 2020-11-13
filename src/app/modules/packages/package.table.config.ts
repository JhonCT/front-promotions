export enum Actions {
  edit = 'edit',
  active = 'active',
  deactive = 'deactive',
}

export const packagesTableConfig = {
  listActions: () => {
    return {
      edit: {
        action: Actions.edit,
        icon: 'edit',
        color: '#2ca3c4',
        label: 'Editar',
        function: 'handleEdit',
        show: true,
      },
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
    };
  },
  dataTable: {
    tableId: 'PACKAGES',
    columns: [
      { header: 'ID', align: 'left', key: 'packageId', width: '120', show: true },
      { header: 'Monto', align: 'right', key: 'amount', width: '120', show: true },
      { header: 'Descripcion', align: 'left', key: 'description', width: '120', show: true },
      { header: 'Estado', align: 'left', key: 'active', width: '80', show: true },
      { header: 'Creado en', align: 'left', key: 'insDatetime', width: '100', show: true },
    ],
    actionColumn: true,
    indexColumn: true,
    pageSizeOptions: [10, 20, 50, 100],
    pageSizeDefault: 10,
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
