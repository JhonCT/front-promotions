import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionsComponent } from './promotions/promotions.component';
import { TypesComponent } from './types/types.component';
import { PromotionsRoutingModule } from './promotions-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@core/ui-kit/material.module';
import { LocalCommonModule } from '@common/local-common.module';
import { TableMultifilterModule } from '@core/components/table/table-multifilter/table-multifilter.module';
import { AtomsFormFieldModule } from '@core/components/atoms/atoms-form-field/atoms-form-field.module';
import { PromotionsWriteComponent } from './promotions-write/promotions-write.component';

@NgModule({
  declarations: [PromotionsComponent, TypesComponent, PromotionsWriteComponent],
  imports: [
    CommonModule,
    PromotionsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    LocalCommonModule,
    TableMultifilterModule,
    AtomsFormFieldModule,
  ],
})
export class PromotionsModule { }
