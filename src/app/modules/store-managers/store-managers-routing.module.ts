import { StoreManagersWriteComponent } from './store-managers-write/store-managers-write.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreManagersComponent } from './store-managers.component';

const routes: Routes = [
  {
    path: '',
    component: StoreManagersComponent
  },
  {
    path: 'write/:id',
    component: StoreManagersWriteComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreManagersRoutingModule { }
