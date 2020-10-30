import { AuthGuard } from './shared/common/guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './modules/main.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'home', 		loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule), canActivate: [AuthGuard]  },
      { path: 'users', loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule), canActivate: [AuthGuard] },
      { path: 'store-managers', loadChildren: () => import('./modules/store-managers/store-managers.module').then(m => m.StoreManagersModule) },
      { path: 'players', loadChildren: () => import('./modules/players/players.module').then(m => m.PlayersModule) },
      { path: 'in-out-report', loadChildren: () => import('./modules/report/in-out-report/in-out-report.module').then(m => m.InOutReportModule) },
    ],
  },
];
// const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
