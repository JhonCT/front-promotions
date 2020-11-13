import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PackagesRoutingModule } from './packages-routing.module';
import { PackagesComponent } from './packages.component';
import { PackagesWriteComponent } from './packages-write/packages-write.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@core/ui-kit/material.module';
import { LocalCommonModule } from '@common/local-common.module';
import { TableMultifilterModule } from '@core/components/table/table-multifilter/table-multifilter.module';
import { AtomsFormFieldModule } from '@core/components/atoms/atoms-form-field/atoms-form-field.module';


@NgModule({
  declarations: [PackagesComponent, PackagesWriteComponent],
  imports: [
    CommonModule,
    PackagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    LocalCommonModule,
    TableMultifilterModule,
    AtomsFormFieldModule,
  ]
})
export class PackagesModule { }
