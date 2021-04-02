import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PromotionsComponent } from './promotions/promotions.component';
import { TypesComponent } from './types/types.component';
import { PromotionsWriteComponent } from './promotions-write/promotions-write.component'

const routes: Routes = [
    { path: 'promotions', component: PromotionsComponent },
    { path: 'write/new', component: PromotionsWriteComponent },
    { path: 'write/:id', component: PromotionsWriteComponent },
    { path: 'types', component: TypesComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PromotionsRoutingModule { }
