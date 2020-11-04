import { ProfileService } from './../../../services/profile.service';
import { IUser } from './../users.interface';
import { filter, map, switchMap } from 'rxjs/operators';
import { UsersService } from './../users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from '../users.interface';
import { MyValidator } from '@core/components/atoms/atoms-form-field/control-error/my-validator';
import { ToasterService } from '@core/services/toaster.service';
import { StoresService } from 'app/services/stores.service';
import { ConfirmDialogService } from '@common/components/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-users-write',
  templateUrl: './users-write.component.html',
  styleUrls: ['./users-write.component.scss'],
})
export class UsersWriteComponent implements OnInit {
  id = '';
  parameter: User;

  pageType = 'new';
  form: FormGroup;
  profiles = [];
  stores = [];
  showStore = false;
  constructor(
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private svc: UsersService,
    private formBuilder: FormBuilder,
    private profileSvc: ProfileService,
    private storeSvc: StoresService,
    private toast: ToasterService,
    private confirmSvc: ConfirmDialogService
  ) {}

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

  profileItems() {
    return this.profileSvc.items({}).pipe(
      map((result) => {
        return result.data.items;
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

  ngOnInit(): void {
    this.form = this.createForm(new User());
    this.profileItems()
      .pipe(
        switchMap((profiles) => {
          this.profiles = profiles;
          // obtenemos el parametro
          return this.storeItems();
        }),
        switchMap((stores) => {
          this.stores = stores;
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
      .subscribe((user: IUser) => {
        if (['SELLER'].includes(user.profileId)) {
          this.showStore = true;
        }
        this.form = this.createForm(new User(user));
      });
  }

  createForm(model: IUser): FormGroup {
    return this.formBuilder.group({
      email: [model.email, Validators.compose([MyValidator.required, MyValidator.email])],
      firstName: [model.firstName, Validators.compose([MyValidator.required, MyValidator.minLength(4)])],
      lastName: [model.lastName, Validators.compose([MyValidator.required, MyValidator.minLength(4)])],
      profileId: [model.profileId, Validators.compose([MyValidator.required])],
      storeId: [model.storeId, Validators.compose([])],
    });
  }

  handleNewItem(): void {
    if (!this.form.valid) return;
    const data = this.form.value;
    data.username = data.email;
    if (['SELLER'].includes(data.profileId) && !data.storeId) {
      this.toast.error({ message: `Elija una tienda para el usuario` });
      return;
    }
    this.svc
      .newItem({
        body: data,
      })
      .subscribe((result: any) => {
        const user = result.data.item;
        this.confirmSvc
          .confirm({
            msg: `
              El siguiente usuario ha sido creado exitosamente: \n
              <span class="usercreated__label"> Username: </span> <span class="usercreated__value"> ${user.email} </span>
              <span class="usercreated__label"> Contraseña generada : </span> <span class="usercreated__value"> ${ user.passText } </span>
              Nota: copie la contraseña
            `,
            btnCancel: 'PERMANECER AQUI',
            btnConfirm: 'REGRESAR A USUARIOS' })
          .subscribe({
            next: (confirm) => {
              if(confirm) {
                this.router.navigate(['/users']);
                return;
              }
              this.form.reset();
            }
          });
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
        this.router.navigate(['/users']);
      });
  }

  handleCancel(): void {
    this.router.navigate(['/users']);
  }

  profileSelected(profile) {
    if (['SELLER'].includes(profile.profileId)) {
      this.showStore = true;
      return;
    }
    this.showStore = false;
  }
}
