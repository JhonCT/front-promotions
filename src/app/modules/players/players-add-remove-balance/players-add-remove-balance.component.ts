import { ConfirmDialogService } from './../../../shared/common/components/confirm-dialog/confirm-dialog.service';
import { WalletService } from './../../../services/wallet.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MyValidator } from './../../../shared/core/components/atoms/atoms-form-field/control-error/my-validator';
import { ICustomer } from './../../../models/customer.interface';
import { filter, map, switchMap } from 'rxjs/operators';
import { CustomerService } from './../../../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from 'app/models/customer.interface';
import { ToasterService } from '@core/services/toaster.service';

@Component({
  selector: 'app-players-add-remove-balance',
  templateUrl: './players-add-remove-balance.component.html',
  styleUrls: ['./players-add-remove-balance.component.scss']
})
export class PlayersAddRemoveBalanceComponent implements OnInit {
  id = '';
  customer: Customer;

  pageType = 'new';
  form: FormGroup;
  profiles = [];
  constructor(
    public dialogRef: MatDialogRef<PlayersAddRemoveBalanceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private svc: CustomerService,
    private formBuilder: FormBuilder,
    private toast: ToasterService,
    private walletSvc: WalletService,
    private confirmSvc: ConfirmDialogService,
  ) {
    this.customer = data.item;
    console.log(this.data)
  }

  ngOnInit(): void {
    this.form = this.createForm(new Customer(this.data.item));
  }

  createForm(model: ICustomer): FormGroup {
    return this.formBuilder.group({
      email: [model.email, Validators.compose([])],
      names: [`${model.firstName} ${model.lastName}`, Validators.compose([])],
      lastName: [model.lastName, Validators.compose([])],
      username: [model.username, Validators.compose([])],
      coins: [model.player.coins, Validators.compose([])],
      comment: [null, Validators.compose([])],
      amount: [ null, Validators.compose([MyValidator.required, MyValidator.minLength(1), MyValidator.min(1)])],
    });
  }

  addBalance() {
    if (!this.form.valid) return;
    const data = this.form.value;
    this.confirmSvc
      .confirm({msg: `Esta a punto de agregar el monto: <p class="confirm__add__balance__player">${(+data.amount).toFixed(2)}</p> al balance del jugador. ¿Proceder?`})
      .pipe(
        filter((confirm) => confirm),
        switchMap(() => {
          return this.walletSvc.credit({
            playerId: this.customer.player.playerId,
            amount: Math.round(data.amount * 100),
            comment: data.comment || '',
          });
        })
      )
      .subscribe({
        next: (result) => {
          this.toast.success({ message: result.kindMessage });
          this.dialogRef.close();
        },
        error: (err) => {
          this.toast.error( { message: err['kindMessage'] } );
        }
      });
  }

  removeBalance() {
    if (!this.form.valid) return;
    const data = this.form.value;
    if(Math.round(data.amount * 100) > +this.customer.player.coins) {
      this.toast.error({ message: 'insufficient balance' });
      return;
    }
    this.confirmSvc
      .confirm({msg: `Esta a punto de quitar el monto: <p class="confirm__add__balance__player">${(+data.amount).toFixed(2)}</p> del balance del jugador. ¿Proceder?`})
      .pipe(
        filter((confirm) => confirm),
        switchMap(() => {
          return this.walletSvc.debit({
            playerId: this.customer.player.playerId,
            amount: Math.round(data.amount * 100),
            comment: data.comment || '',
          });
        })
      )
      .subscribe({
        next: (result) => {
          this.toast.success({ message: result.kindMessage });
          this.dialogRef.close();
        },
        error: (err) => {
          this.toast.error( { message: err['kindMessage'] } );
        }
      });
  }
}
