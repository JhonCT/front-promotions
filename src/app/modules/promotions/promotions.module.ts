import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionsComponent } from './promotions/promotions.component';
import { TypesComponent } from './types/types.component';



@NgModule({
  declarations: [PromotionsComponent, TypesComponent],
  imports: [
    CommonModule
  ]
})
export class PromotionsModule { }
