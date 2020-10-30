import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreManagersRoutingModule } from './store-managers-routing.module';
import { StoreManagersComponent } from './store-managers.component';
import { StoreManagersWriteComponent } from './store-managers-write/store-managers-write.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@core/ui-kit/material.module';
import { LocalCommonModule } from '@common/local-common.module';
import { TableMultifilterModule } from '@core/components/table/table-multifilter/table-multifilter.module';
import { AtomsFormFieldModule } from '@core/components/atoms/atoms-form-field/atoms-form-field.module';


@NgModule({
  declarations: [StoreManagersComponent, StoreManagersWriteComponent],
  imports: [
    CommonModule,
    StoreManagersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    LocalCommonModule,
    TableMultifilterModule,
    AtomsFormFieldModule,
  ]
})
export class StoreManagersModule { }
