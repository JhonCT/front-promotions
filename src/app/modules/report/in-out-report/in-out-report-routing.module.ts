import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InOutReportComponent } from './in-out-report.component';

const routes: Routes = [{ path: '', component: InOutReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InOutReportRoutingModule { }
