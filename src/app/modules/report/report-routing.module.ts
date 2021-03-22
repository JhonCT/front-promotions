import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InOutReportComponent } from './in-out-report/in-out-report.component';
import { ForProvidersComponent } from './for-providers/for-providers.component';
import { ForGamesComponent } from './for-games/for-games.component';
import { ForPlayersComponent } from './for-players/for-players.component';

const routes: Routes = [
  { path: 'in-out-report', component: InOutReportComponent },
  { path: 'for-providers-by-stores', component: ForProvidersComponent },
  { path: 'for-games-by-stores', component: ForGamesComponent },
  { path: 'for-players-by-stores', component: ForPlayersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
