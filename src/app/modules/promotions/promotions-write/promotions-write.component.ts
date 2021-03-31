import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyValidator } from '@core/components/atoms/atoms-form-field/control-error/my-validator';
import { IPromotions, Promotions } from 'app/models/promotions.interface';

@Component({
  selector: 'app-promotions-write',
  templateUrl: './promotions-write.component.html',
  styleUrls: ['./promotions-write.component.scss']
})
export class PromotionsWriteComponent implements OnInit {
  id = '';
  pageType = 'new';
  form: FormGroup;
  types = [];
  limitTypes = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.createForm(new Promotions())
  }

  handleCancel() {
    this.router.navigate(['/promotions/promotions']);
  }

  handleNewItem() {

  }

  handleUpdItem() {

  }

  createForm(model: IPromotions): FormGroup {
    return this.formBuilder.group({
      name: [model.name, Validators.compose([MyValidator.required, MyValidator.minLength(4)])],
      description: [model.description],
      typeId: [model.typeId, Validators.compose([MyValidator.required])],
      bonus: [model.bonus, Validators.compose([MyValidator.required])],
      releaser: [model.releaser],
      limitType: [model.limitType, Validators.compose([MyValidator.required])],
      limitPayment: [model.limitType, Validators.compose([MyValidator.required])],
      life: [model.limitType],
      redeemsByIp: [model.redeemsByIp],
      redeemsByPlayer: [model.redeemsByPlayer],
      redeemsTotal: [model.redeemsTotal],
    });
  }

}
