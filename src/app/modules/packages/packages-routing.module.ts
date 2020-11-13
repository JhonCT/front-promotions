import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PackagesWriteComponent } from './packages-write/packages-write.component';

import { PackagesComponent } from './packages.component';

const routes: Routes = [
  { path: '', component: PackagesComponent },
  {
    path: 'write/:id',
    component: PackagesWriteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PackagesRoutingModule {}
