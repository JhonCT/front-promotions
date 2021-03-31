export enum Actions {
}

export const PromotionsTableConfig = {
    listActions: () => {
        return {
        };
    },
    dataTable: {
        tableId: 'PROMOTIONS',
        columns: [
            { header: 'ID', align: 'left', key: 'txId', width: '120', show: true },
            { header: 'Nombre', align: 'left', key: 'name', width: '120', show: true },
            { header: 'Description', align: 'right', key: 'description', width: '120', show: true },
            { header: 'Tipo de Bono', align: 'left', key: 'typeId', width: '120', show: true },
            { header: 'Bono', align: 'left', key: 'bonus', width: '120', show: true },
            { header: 'Monto Liberador', align: 'right', key: 'releaser', width: '100', show: true },
            { header: 'Tipo de límite', align: 'right', key: 'limitType', width: '100', show: true },
            { header: 'Límite de Pago', align: 'left', key: 'limitPayment', width: '100', show: true },
            { header: 'Horas de Vida', align: 'left', key: 'life', width: '100', show: true },
            { header: 'Cantidad Por IP', align: 'left', key: 'redeemsByIp', width: '80', show: true },
            { header: 'Cantidad Por Player', align: 'left', key: 'redeemsByPlayer', width: '100', show: true },
            { header: 'Cantidad Total', align: 'left', key: 'redeemsTotal', width: '100', show: true }
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
