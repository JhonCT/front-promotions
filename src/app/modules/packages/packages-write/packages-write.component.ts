import { MyValidator } from './../../../shared/core/components/atoms/atoms-form-field/control-error/my-validator';
import { IPackage } from './../package.interface';
import { filter, map, switchMap } from 'rxjs/operators';
import { ToasterService } from './../../../shared/core/services/toaster.service';
import { PackagesService } from './../packages.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Package } from '../package.interface';
import { ConfirmDialogService } from '@common/components/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-packages-write',
  templateUrl: './packages-write.component.html',
  styleUrls: ['./packages-write.component.scss'],
})
export class PackagesWriteComponent implements OnInit {
  id = '';
  parameter: Package;

  pageType = 'new';
  form: FormGroup;
  profiles = [];
  stores = [];
  showStore = false;
  constructor(
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private svc: PackagesService,
    private formBuilder: FormBuilder,
    private toast: ToasterService,
    private confirmSvc: ConfirmDialogService
  ) {}

  ngOnInit(): void {
    this.form = this.createForm(new Package());
    this.routeparam({ key: 'id' })
      .pipe(
        // filtramos que no sea new
        filter((paramId) => paramId != 'new'),
        switchMap((paramId) => {
          this.pageType = 'upd';
          this.id = paramId;
          // consultamos el lenguage
          return this.item({ id: paramId });
        })
      )
      .subscribe((_package: IPackage) => {
        this.form = this.createForm(new Package(_package));
      });
  }

  createForm(model: IPackage): FormGroup {
    return this.formBuilder.group({
      amount: [model.amount &&  Math.round(+model.amount / 100), Validators.compose([MyValidator.required, MyValidator.min(1)])],
      description: [model.description, Validators.compose([MyValidator.required, MyValidator.minLength(1)])],
    });
  }

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

  handleNewItem(): void {
    if (!this.form.valid) return;
    const data = this.form.value;
    console.log('data', data);
    data.amount = Math.round(data.amount * 100);
    this.svc
      .newItem({
        body: data,
      })
      .subscribe((result: any) => {
        this.toast.success({ message: result.kindMessage });
        this.router.navigate(['/packages']);
      });
  }

  handleUpdItem(): void {
    if (!this.form.valid) return;
    const data = this.form.value;
    data.amount = Math.round(data.amount * 100);
    this.svc
      .updItem({
        id: this.id,
        body: data,
      })
      .subscribe((result) => {
        this.toast.success({ message: result.kindMessage });
        this.router.navigate(['/packages']);
      });
  }

  handleCancel(): void {
    this.router.navigate(['/packages']);
  }

}
