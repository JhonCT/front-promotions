import { ICustomer } from './../../models/customer.interface';
import { MatDialog } from '@angular/material/dialog';
import { CustomerService } from './../../services/customer.service';
import { PlayersService } from './players.service';
import { ConfirmDialogService } from './../../shared/common/components/confirm-dialog/confirm-dialog.service';
import { TableMultifilterComponent } from '@core/components/table/table-multifilter/table-multifilter.component';
import { playersTableConfig } from './players.table.config';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from '@core/services/toaster.service';
import { filter, switchMap } from 'rxjs/operators';
import { PlayersWriteComponent } from './players-write/players-write.component';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {

  config = playersTableConfig;
  parameters: ICustomer[] = [];
  filters: any[] = [];

  filtersAllowed = [];

  @ViewChild(TableMultifilterComponent)
  tableMultifilter: TableMultifilterComponent;

  constructor(
    private svc: PlayersService,
    private customerSvc: CustomerService,
    private toast: ToasterService,
    private router: Router,
    private confirmSvc: ConfirmDialogService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.items();
  }

  items() {
    let headers = [];
    this.filters.length && headers.push( { key: 'filters', val: JSON.stringify(this.filters) } );
    this.customerSvc.items( { headers: headers } ).subscribe({
      next: (result) => {
        // this.toast.success( { message: result['kindMessage'] } );
        this.tableMultifilter.chargeDataTable({
          rows: result.data.items.map(( item, i ) => {
            let actions = this.config.listActions();
            !item.user.active && (actions.deactive.show = false);
            item.user.active && (actions.active.show = false);
            item['actions'] = Object.values(actions);
            item['active'] = this.config.active[item.active].label;
            item['coins'] = (+item.player.coins/100).toFixed(2);
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
    this.router.navigate([`/players/write/new`]);
  }

  handleAction(event): void {
    const actions = Object.values(this.config.listActions());
    const action = actions.find((item) => item.action === event.action);
    this[action.function](event.row);
  }

  handleEdit(row: ICustomer): void {
    this.router.navigate([`/players/write/${row.customerId}`]);
  }

  handleActive(item: ICustomer): void {
    this.confirmSvc
      .confirm({msg: `Esta a punto de activar al jugador (${item.customerId}). ¿Proceder?`})
      .pipe(
        filter((confirm) => confirm),
        switchMap(() => {
          return this.customerSvc.activate({ id: item.customerId });
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

  handleDeactive(item: ICustomer): void {
    this.confirmSvc
      .confirm({msg: `Esta a punto de desactivar al jugador (${item.customerId}). ¿Proceder?`})
      .pipe(
        filter((confirm) => confirm),
        switchMap(() => {
          return this.customerSvc.deactivateItem({ id: item.customerId });
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

  handleAddOrRemoveCoins(item: ICustomer): void {
    const dialogRef = this.dialog.open(PlayersWriteComponent, {
      disableClose: false,
      maxWidth: 500,
      panelClass: 'app-dialog',
      data: { item },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.items();
    });
  }

}
