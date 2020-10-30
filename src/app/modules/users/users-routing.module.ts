import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersWriteComponent } from './users-write/users-write.component';

import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  },
  {
    path: 'write/:id',
    component: UsersWriteComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
