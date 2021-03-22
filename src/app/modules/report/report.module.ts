import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { InOutReportComponent } from './in-out-report/in-out-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@core/ui-kit/material.module';
import { LocalCommonModule } from '@common/local-common.module';
import { TableMultifilterModule } from '@core/components/table/table-multifilter/table-multifilter.module';
import { AtomsFormFieldModule } from '@core/components/atoms/atoms-form-field/atoms-form-field.module';
import { ForProvidersComponent } from './for-providers/for-providers.component';
import { ForPlayersComponent } from './for-players/for-players.component';
import { ForGamesComponent } from './for-games/for-games.component';
import { Routes, RouterModule } from '@angular/router';

@NgModule({
  declarations: [InOutReportComponent, ForProvidersComponent, ForPlayersComponent, ForGamesComponent],
  imports: [
    CommonModule,
    ReportRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    LocalCommonModule,
    TableMultifilterModule,
    AtomsFormFieldModule,    
  ],
  providers: [
    DatePipe
  ],  
})
export class InOutReportModule { }
