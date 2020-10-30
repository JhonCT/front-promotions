import { StoreManagersService } from './store-managers.service';
import { ConfirmDialogService } from './../../shared/common/components/confirm-dialog/confirm-dialog.service';
import { storeManagersTableConfig } from './store-managers.table.config';
import { IStoreManager } from './store-managers.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TableMultifilterComponent } from '@core/components/table/table-multifilter/table-multifilter.component';
import { ToasterService } from '@core/services/toaster.service';
import { Router } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-store-managers',
  templateUrl: './store-managers.component.html',
  styleUrls: ['./store-managers.component.scss']
})
export class StoreManagersComponent implements OnInit {

  config = storeManagersTableConfig;
  parameters: IStoreManager[] = [];
  filters: any[] = [];

  filtersAllowed = [];

  @ViewChild(TableMultifilterComponent)
  tableMultifilter: TableMultifilterComponent;

  constructor(
    private svc: StoreManagersService,
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
            item['active'] = this.config.active[item.active].label;
            item['storeName'] = item.store.name;
            item['usrNames'] = `${item.user.firstName} ${item.user.lastName}`;
            item['usrEmail'] = item.user.email;
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
    this.router.navigate([`/store-managers/write/new`]);
  }

  handleAction(event): void {
    const actions = Object.values(this.config.listActions());
    const action = actions.find((item) => item.action === event.action);
    this[action.function](event.row);
  }

  handleEdit(row: IStoreManager): void {
    this.router.navigate([`/store-managers/write/${row.userStoreId}`]);
  }

  handleActive(item: IStoreManager): void {
    this.confirmSvc
      .confirm({msg: `Esta a punto de activar la tienda (${item.store.name}) asignada al usuario (${item.user.email}). ¿Proceder?`})
      .pipe(
        filter((confirm) => confirm),
        switchMap(() => {
          return this.svc.activate({ id: item.userStoreId });
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

  handleDeactive(item: IStoreManager): void {
    this.confirmSvc
      .confirm({msg: `Esta a punto de desactivar la tienda (${item.store.name}) asignada al usuario (${item.user.email}). ¿Proceder?`})
      .pipe(
        filter((confirm) => confirm),
        switchMap(() => {
          return this.svc.deactivateItem({ id: item.userStoreId });
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
