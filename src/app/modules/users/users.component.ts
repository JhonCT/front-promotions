import { AfterViewInit } from '@angular/core';
import { filter, switchMap } from 'rxjs/operators';
import { ConfirmDialogService } from './../../shared/common/components/confirm-dialog/confirm-dialog.service';
import { UsersService } from './users.service';
import { TableMultifilterComponent } from './../../shared/core/components/table/table-multifilter/table-multifilter.component';
import { IUser } from './users.interface';
import { userTableConfig } from './users.table.config';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToasterService } from '@core/services/toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {

  config = userTableConfig;
  user: IUser[] = [];
  filters: any[] = [];

  filtersAllowed = [];

  @ViewChild(TableMultifilterComponent)
  tableMultifilter: TableMultifilterComponent;

  constructor(
    private svc: UsersService,
    private toast: ToasterService,
    private router: Router,
    private confirmSvc: ConfirmDialogService,
  ) { }

  ngOnInit(): void {
    this.items();
  }

  ngAfterViewInit() {
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
    this.router.navigate([`/users/write/new`]);
  }

  handleAction(event): void {
    const actions = Object.values(this.config.listActions());
    const action = actions.find((item) => item.action === event.action);
    this[action.function](event.row);
  }

  handleEdit(row: IUser): void {
    this.router.navigate([`/users/write/${row.userId}`]);
  }

  handleActive(item: IUser): void {
    this.confirmSvc
      .confirm({msg: `Esta a punto de activar al usuario (${item.email}). ¿Proceder?`})
      .pipe(
        filter((confirm) => confirm),
        switchMap(() => {
          return this.svc.activate({ id: item.userId });
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

  handleDeactive(item: IUser): void {
    this.confirmSvc
      .confirm({msg: `Esta a punto de desactivar al usuario (${item.email}). ¿Proceder?`})
      .pipe(
        filter((confirm) => confirm),
        switchMap(() => {
          return this.svc.deactivateItem({ id: item.userId });
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

  handleResetPassword(item: IUser): void {
    this.confirmSvc
      .confirm({msg: `Esta a punto de resetear la contraseña (${item.email}). ¿Proceder?`})
      .pipe(
        filter((confirm) => confirm),
        switchMap(() => {
          return this.svc.resetPassword({ id: item.userId });
        })
      )
      .subscribe({
        next: (result) => {
          this.items();
          this.confirmSvc
          .confirm({
            msg: `
              Se ha reseteado la contraseña exitosamente: \n
              <span class="usercreated__label"> Contraseña generada : </span> <span class="usercreated__value"> ${ result.data.item.passText } </span>
              Nota: copie la contraseña
            `,
            btnCancel: 'CERRAR',
            btnConfirm: 'ACEPTAR' })
          .subscribe();
        },
        error: (err) => {
          this.toast.error( { message: err['kindMessage'] } );
        }
      });
  }

}
