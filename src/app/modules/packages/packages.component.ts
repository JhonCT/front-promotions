import { PackagesService } from './packages.service';
import { ToasterService } from './../../shared/core/services/toaster.service';
import { IPackage } from './package.interface';
import { packagesTableConfig } from './package.table.config';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TableMultifilterComponent } from '@core/components/table/table-multifilter/table-multifilter.component';
import { ConfirmDialogService } from '@common/components/confirm-dialog/confirm-dialog.service';
import { Router } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {

  config = packagesTableConfig;
  user: IPackage[] = [];
  filters: any[] = [];

  filtersAllowed = [];

  @ViewChild(TableMultifilterComponent)
  tableMultifilter: TableMultifilterComponent;

  constructor(
    private svc: PackagesService,
    private toast: ToasterService,
    private router: Router,
    private confirmSvc: ConfirmDialogService,
  ) { }

  ngOnInit(): void {
    this.items();
  }

  items() {
    let headers = [];
    this.filters.length && headers.push( { key: 'filters', val: JSON.stringify(this.filters) } );
    this.svc.items( { headers: headers } ).subscribe({
      next: (result) => {
        // this.toast.success( { message: result['kindMessage'] } );
        this.tableMultifilter.chargeDataTable({
          rows: result.data.items.map(( item, i ) => {
            let actions = this.config.listActions();
            !item.active && (actions.deactive.show = false);
            item.active && (actions.active.show = false);
            item['actions'] = Object.values(actions);
            item['amount'] = (+item.amount/100).toFixed(2);
            item['active'] = this.config.active[item.active].label;
            return item;
          }),
          filters: result.filtersAllowed
        });
        this.filtersAllowed = result.filtersAllowed;
      },
      error: (err) => {
        // this.loadingOverlay.hide();
        this.toast.error( { message: err['kindMessage'] } );
      }
    });
  }

  handleFilter(event: any): void {
    this.filters = event;
    this.items();
  }

  handleNew(event: any): void {
    this.router.navigate([`/packages/write/new`]);
  }

  handleAction(event): void {
    const actions = Object.values(this.config.listActions());
    const action = actions.find((item) => item.action === event.action);
    this[action.function](event.row);
  }

  handleEdit(row: IPackage): void {
    this.router.navigate([`/packages/write/${row.packageId}`]);
  }

  handleActive(item: IPackage): void {
    this.confirmSvc
      .confirm({msg: `Esta a punto de activar el paquete (${item.packageId}). ¿Proceder?`})
      .pipe(
        filter((confirm) => confirm),
        switchMap(() => {
          return this.svc.activate({ id: item.packageId });
        })
      )
      .subscribe({
        next: (result) => {
          this.items();
          this.toast.success( { message: result['kindMessage'] } );
        },
        error: (err) => {
          this.toast.error( { message: err['kindMessage'] } );
        }
      });
  }

  handleDeactive(item: IPackage): void {
    this.confirmSvc
      .confirm({msg: `Esta a punto de desactivar el paquete (${item.packageId}). ¿Proceder?`})
      .pipe(
        filter((confirm) => confirm),
        switchMap(() => {
          return this.svc.deactivateItem({ id: item.packageId });
        })
      )
      .subscribe({
        next: (result) => {
          this.items();
          this.toast.success( { message: result['kindMessage'] } );
        },
        error: (err) => {
          this.toast.error( { message: err['kindMessage'] } );
        }
      });
  }

}
