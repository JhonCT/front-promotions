export interface IPackage {
  packageId?: string;
  amount?: string;
  description?: string;
  active?: string;
  insUserId?: string;
  insDate?: string;
  insDatetime?: string;
}

export class Package {
  packageId = "";
  amount = "";
  description = "";
  active = "";
  insUserId = "";
  insDate = "";
  insDatetime = "";

  constructor(model?) {
    Object.assign(this, model);
  }
}

