import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InOutReportComponent } from './in-out-report/in-out-report.component';
import { ForProvidersComponent } from './for-providers/for-providers.component';

const routes: Routes = [
  { path: 'in-out-report', component: InOutReportComponent },
  { path: 'for-events', component: ForProvidersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ReportRoutingModule { }
