import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MyValidator } from '@core/components/atoms/atoms-form-field/control-error/my-validator';
import { IPromotions, Promotions } from 'app/models/promotions.interface';
import { ToasterService } from 'app/shared/core/services/toaster.service';
import { PromotionsService } from '../promotions.service';

@Component({
  selector: 'app-promotions-write',
  templateUrl: './promotions-write.component.html',
  styleUrls: ['./promotions-write.component.scss']
})
export class PromotionsWriteComponent implements OnInit {
  id = '';
  pageType = 'new';
  form: FormGroup;
  types = [
    { id: 'amn', text: 'Amount' },
    { id: 'per', text: 'Percentage' }
  ];
  limitTypes = [
    { id: 'amn', text: 'Amount' },
    { id: 'per', text: 'Percentage' }
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private promoService: PromotionsService,
    private toast: ToasterService,
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.pageType = 'edit';
      this.promoService.itemPromo({ id: this.id, headers: [] }).subscribe({
        next: (result) => {
          const item = result.data['Item'];
          let promotion = new Promotions(item);
          this.form = this.createForm(promotion);
        }, error: (err) => {
          this.toast.error({ message: err['kindMessage'] });
        }
      })
    }

    this.form = this.createForm(new Promotions());
  }

  handleCancel() {
    this.router.navigate(['/promotions/promotions']);
  }

  handleNewItem() {
    if (!this.form.valid) return;

    //  const data = this.form.value;

    const data = {
      "promoId": "123",
      "bonus": 2000,
      "description": "Compensaciones - Clasico Slots",
      "life": 168,
      "limitPayment": 100000,
      "limitType": "amn",
      "name": "Compensaciones - Clasico Slots",
      "redeemsByIp": 1,
      "redeemsByPlayer": 1,
      "redeemsTotal": 1,
      "releaser": 1009,
      "typeId": "gift",
      "insUserId": "3"
    };

    console.log(data);

    this.promoService.newItemPromo({ headers: [], body: data }).subscribe({
      next: (result) => {
        console.log(result);
      }, error: (err) => {
        console.log(err);
      }
    })

  }

  handleUpdItem() {
    if (!this.form.valid) return;

    const data = this.form.value;
    let headers = [];

    this.promoService.updItemPromo({ id: this.id, headers: headers, body: data }).subscribe({
      next: (result) => {
        console.log(result);
      }, error: (err) => {
        console.log(err);
      }
    })

  }

  createForm(model: IPromotions): FormGroup {
    console.log(model);
    return this.formBuilder.group({
      name: [model.name, Validators.compose([MyValidator.required, MyValidator.minLength(4)])],
      description: [model.description],
      typeId: [model.typeId, Validators.compose([MyValidator.required])],
      bonus: [model.bonus, Validators.compose([MyValidator.required])],
      releaser: [model.releaser],
      limitType: [model.limitType, Validators.compose([MyValidator.required])],
      limitPayment: [model.limitPayment, Validators.compose([MyValidator.required])],
      life: [model.life],
      redeemsByIp: [model.redeemsByIp],
      redeemsByPlayer: [model.redeemsByPlayer],
      redeemsTotal: [model.redeemsTotal],
    });
  }

}
