import { IdentsService } from './../../../services/idents.service';
import { CurrenciesService } from './../../../services/currencies.service';
import { GeoService } from './../../../services/geo.service';
import { ConfirmDialogService } from './../../../shared/common/components/confirm-dialog/confirm-dialog.service';
import { WalletService } from './../../../services/wallet.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MyValidator } from './../../../shared/core/components/atoms/atoms-form-field/control-error/my-validator';
import { ICustomer } from './../../../models/customer.interface';
import { filter, map, switchMap, switchMapTo } from 'rxjs/operators';
import { CustomerService } from './../../../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from 'app/models/customer.interface';
import { ToasterService } from '@core/services/toaster.service';
import { StoresService } from 'app/services/stores.service';
import { SessionService } from 'app/modules/auth/session.service';

@Component({
  selector: 'app-players-write',
  templateUrl: './players-write.component.html',
  styleUrls: ['./players-write.component.scss'],
})
export class PlayersWriteComponent implements OnInit {
  id = '';
  customer: Customer;
  // 1 => Email | 2 => (icCode)Phone | 3 => Username
  userType = [
    {
      id: '1',
      text: 'Email',
    },
    {
      id: '2',
      text: 'Telefono',
    },
    {
      id: '3',
      text: 'Username aleatorio',
    },
  ];
  pageType = 'new';
  form: FormGroup;
  profiles = [];
  countries = [];
  countryitemSelected;
  currencies = [];
  idents = [];
  stores = [];
  constructor(
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private svc: CustomerService,
    private formBuilder: FormBuilder,
    private toast: ToasterService,
    private walletSvc: WalletService,
    private confirmSvc: ConfirmDialogService,
    private geoSvc: GeoService,
    private currencySvc: CurrenciesService,
    private storeSvc: StoresService,
    private sessionSvc: SessionService,
    private identsSvc: IdentsService
  ) {}

  ngOnInit(): void {
    this.form = this.createForm(new Customer());
    this.geoSvc.countries({}).subscribe((result) => {
      this.countries = result.data.items;
    });
    this.storeSvc.items({}).pipe(
      map(result => {
        const session = this.sessionSvc.getSession();
        switch(session.profileId) {
          case 'PROVIDER':
            return result.data.items;
          case 'ADMIN':
            return result.data.items;
          case 'ROOT':
            return result.data.items;
          case 'SELLER':
            return result.data.items.find(item => item.storeId == session.storeId);
        }
        return [];
      })
    ).subscribe((stores: any) => {
      this.stores = stores;
    })
  }

  createForm(model: ICustomer): FormGroup {
    return this.formBuilder.group({
      firstName: [model.firstName, Validators.compose([, MyValidator.minLength(4)])],
      lastName: [model.lastName, Validators.compose([, MyValidator.minLength(4)])],
      email: [model.email, Validators.compose([MyValidator.email])],
      phone: [model.phone, Validators.compose([])],
      birthdate: [model.birthdate, Validators.compose([])],
      userType: [model.username, Validators.compose([MyValidator.required])],
      countryId: [model.countryId, Validators.compose([])],
      city: [model.city, Validators.compose([])],
      address: [model.address, Validators.compose([])],
      identId: [model.identId, Validators.compose([])],
      identification: [model.identification, Validators.compose([])],
      currencyId: [model.identification, Validators.compose([])],
      storeId: [model.storeId, Validators.compose([MyValidator.required])],
    });
  }

  countrySelected(country) {
    this.countryitemSelected = country;
    this.currencySvc.currencies({ countryId: country.countryId, langId: 'es' }).subscribe((result) => {
      this.currencies = result.data.items;
    });
    this.identsSvc.idents({ countryId: country.countryId, langId: 'es' }).subscribe((result) => {
      this.idents = result.data.items;
    });
  }

  handleNewItem(): void {
    if (!this.form.valid) return;
    const data = this.form.value;
    // validaciones
    if(data.userType == 1 && !data.email) {
      this.toast.error({ message: `Ingrese un email` });
      return;
    }
    if(data.userType == 2 && !data.phone) {
      this.toast.error({ message: `Ingrese un telefono ` });
      return;
    }

    data.icCode = '';
    if(data.userType == 2 && !this.countryitemSelected) {
      this.toast.error({ message: `Seleccione un pais` });
      return;
    }

    if(data.userType == 2 && this.countryitemSelected) {
      data.icCode = this.countryitemSelected.icCode;
    }

    this.svc.newItem({ body: data }).subscribe((result: any) => {
      const customer = result.data.item;
      this.confirmSvc
          .confirm({
            msg: `
              El siguiente usuario ha sido creado exitosamente: \n
              <span class="usercreated__label"> Username: </span> <span class="usercreated__value"> ${customer.username} </span>
              <span class="usercreated__label"> Contraseña generada : </span> <span class="usercreated__value"> ${ customer.passText } </span>
              Nota: copie la contraseña
            `,
            btnCancel: 'PERMANECER AQUI',
            btnConfirm: 'REGRESAR A JUGADORES' })
          .subscribe({
            next: (confirm) => {
              if(confirm) {
                this.router.navigate(['/players']);
                return;
              }
              this.form.reset();
            }
          });
    });
    console.log(data);
  }

  handleUpdItem(): void {
    if (!this.form.valid) return;
    const data = this.form.value;
  }

  handleCancel(): void {
    this.router.navigate(['/players']);
  }
}
