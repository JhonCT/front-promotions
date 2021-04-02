export enum Actions {
    edit = 'edit',
    active = 'active',
    deactive = 'deactive',
}

export const PromotionsTableConfig = {
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
        tableId: 'PROMOTIONS',
        columns: [
            { header: 'ID', align: 'left', key: 'txId', width: '20', show: true },
            { header: 'Nombre', align: 'left', key: 'name', width: '120', show: true },
            { header: 'Description', align: 'left', key: 'description', width: '120', show: true },
            { header: 'Tipo de Bono', align: 'left', key: 'typeId', width: '50', show: true },
            { header: 'Bono', align: 'right', key: 'bonus', width: '50', show: true },
            { header: 'Monto Liberador', align: 'right', key: 'releaser', width: '50', show: true },
            { header: 'Tipo de límite', align: 'left', key: 'limitType', width: '100', show: true },
            { header: 'Límite de Pago', align: 'right', key: 'limitPayment', width: '50', show: true },
            { header: 'Horas de Vida', align: 'left', key: 'life', width: '30', show: true },
            { header: 'Cantidad Por IP', align: 'left', key: 'redeemsByIp', width: '30', show: true },
            { header: 'Cantidad Por Player', align: 'left', key: 'redeemsByPlayer', width: '30', show: true },
            { header: 'Cantidad Total', align: 'left', key: 'redeemsTotal', width: '30', show: true }
        ],
        actionColumn: true,
        indexColumn: false,
        pageSizeOptions: [10, 20, 50, 100],
        pageSizeDefault: 10,
        showFilters: true,
        showBtnReload: false,
        showBtnDownload: true,
        showBtnAdd: true,
        showChooseColumns: true,
        showGroupByOptions: false,
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
