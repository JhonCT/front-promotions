import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { InOutReportRoutingModule } from './in-out-report-routing.module';
import { InOutReportComponent } from './in-out-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@core/ui-kit/material.module';
import { LocalCommonModule } from '@common/local-common.module';
import { TableMultifilterModule } from '@core/components/table/table-multifilter/table-multifilter.module';
import { AtomsFormFieldModule } from '@core/components/atoms/atoms-form-field/atoms-form-field.module';


@NgModule({
  declarations: [InOutReportComponent],
  imports: [
    CommonModule,
    InOutReportRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    LocalCommonModule,
    TableMultifilterModule,
    AtomsFormFieldModule,
  ],
  providers: [
    DatePipe
  ]
})
export class InOutReportModule { }
