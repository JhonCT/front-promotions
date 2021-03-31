import { MoneyPipe } from './pipes/money.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './components/title/title.component';
import { LogoComponent } from './components/logo/logo.component';
import { RouterOutletTabComponent } from './components/router-outlet-tab/router-outlet-tab.component';
import { Routes, RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ToastrModule } from 'ngx-toastr';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ConfirmLogoutComponent } from './components/confirm-dialog/confirm-logout.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AtomsFormFieldModule } from '../../shared/core/components/atoms/atoms-form-field/atoms-form-field.module';
import { FindDialogComponent } from './components/find-dialog/find-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { CdkTableModule } from '@angular/cdk/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
// const routerChildren: Routes = [];
@NgModule({
  declarations: [
    TitleComponent,
    LogoComponent,
    RouterOutletTabComponent,
    LoadingComponent,
    LoadingOverlayComponent,
    ConfirmDialogComponent,
    ConfirmLogoutComponent,
    ChangePasswordComponent,
    MoneyPipe,
    FindDialogComponent,
  ],
  entryComponents: [
    ConfirmDialogComponent,
    ConfirmLogoutComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatTabsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    AtomsFormFieldModule,
    MatInputModule,
    CdkTableModule,
    MatTableModule,
    MatPaginatorModule,
    MatRadioModule,
    ToastrModule.forRoot({
      closeButton: true,
      maxOpened: 1,
      autoDismiss: false,
      preventDuplicates: true,
      tapToDismiss: false,
    }),
  ],
  exports: [TitleComponent, LogoComponent, RouterOutletTabComponent, MoneyPipe],
})
export class LocalCommonModule { }
