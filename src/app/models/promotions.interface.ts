export interface IPromotions {
    promoId?: string;
    name?: string;
    description?: string;
    typeId?: string;
    bonus?: number;
    releaser?: number;
    limitType?: string;
    limitPayment?: string;
    life?: number;
    redeemsByIp?: number;
    redeemsByPlayer?: number;
    redeemsTotal?: number;
    insUserId?: string;
}

export class Promotions {
    promoId = '';
    name = '';
    description = '';
    typeId = '';
    bonus = 0;
    releaser = 0;
    limitType = '';
    limitPayment = '';
    life = 0;
    redeemsByIp = 0;
    redeemsByPlayer = 0;
    redeemsTotal = 0;
    insUserId = '';

    constructor(model?) {
        Object.assign(this, model);
    }
}

