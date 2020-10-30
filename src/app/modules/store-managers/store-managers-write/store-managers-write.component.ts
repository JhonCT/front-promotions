import { MyValidator } from './../../../shared/core/components/atoms/atoms-form-field/control-error/my-validator';
import { StoreManagersService } from './../store-managers.service';
import { StoresService } from './../../../services/stores.service';
import { filter, map, switchMap } from 'rxjs/operators';
import { ProfileService } from './../../../services/profile.service';
import { UsersService } from './../../users/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IStoreManager, StoreManager } from './../store-managers.interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterService } from '@core/services/toaster.service';

@Component({
  selector: 'app-store-managers-write',
  templateUrl: './store-managers-write.component.html',
  styleUrls: ['./store-managers-write.component.scss']
})
export class StoreManagersWriteComponent implements OnInit {
  id = '';
  parameter: IStoreManager;

  pageType = 'new';
  form: FormGroup;
  stores = [];
  users = [];
  constructor(
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private svc: StoreManagersService,
    private userSvc: UsersService,
    private storeSvc: StoresService,
    private formBuilder: FormBuilder,
    private toast: ToasterService,
  ) { }

  routeparam({ key }) {
    return this.activatedRoute.params.pipe(
      map((params) => {
        return params[key];
      })
    );
  }

  item({ id }) {
    return this.svc.item({ id }).pipe(
      map((result) => {
        return result.data.item;
      })
    );
  }

  storeItems() {
    return this.storeSvc.items({}).pipe(
      map((result) => {
        return result.data.items;
      })
    );
  }

  usersItems() {
    return this.userSvc.items({}).pipe(
      map((result) => {
        return result.data.items;
      })
    );
  }

  ngOnInit(): void {
    console.log('||', new StoreManager());
    this.form = this.createForm(new StoreManager());
    this.storeItems()
      .pipe(
        switchMap((stores) => {
          this.stores = stores;
          // obtenemos el parametro
          return this.usersItems();
        }),
        switchMap((users) => {
          this.users = users.map(user => ({ ...user, names: `${user.firstName} ${user.lastName}` }));
          // obtenemos el parametro
          return this.routeparam({ key: 'id' });
        }),
        // filtramos que no sea new
        filter((paramId) => paramId != 'new'),
        switchMap((paramId) => {
          this.pageType = 'upd';
          this.id = paramId;
          // consultamos el lenguage
          return this.item({ id: paramId });
        })
      )
      .subscribe((storeManager: IStoreManager) => {
        this.form = this.createForm(new StoreManager(storeManager));
      });
  }

  createForm(model: IStoreManager): FormGroup {
    return this.formBuilder.group({
      storeId: [model.storeId, Validators.compose([MyValidator.required])],
      userId: [model.userId, Validators.compose([MyValidator.required])],
    });
  }


  handleNewItem(): void {
    if (!this.form.valid) return;
    const data = this.form.value;
    this.svc
      .newItem({
        body: data,
      })
      .subscribe((result: any) => {
        this.toast.success({ message: result.kindMessage });
        this.router.navigate(['/store-managers']);
      });
  }

  handleUpdItem(): void {
    if (!this.form.valid) return;
    const data = this.form.value;
    this.svc
      .updItem({
        id: this.id,
        body: data,
      })
      .subscribe((result) => {
        this.toast.success({ message: result.kindMessage });
        this.router.navigate(['/store-managers']);
      });
  }

  handleCancel(): void {
    this.router.navigate(['/store-managers']);
  }
}
