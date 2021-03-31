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
      { path: 'home', loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule), canActivate: [AuthGuard] },
      { path: 'users', loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule), canActivate: [AuthGuard] },
      { path: 'store-managers', loadChildren: () => import('./modules/store-managers/store-managers.module').then(m => m.StoreManagersModule) },
      { path: 'players', loadChildren: () => import('./modules/players/players.module').then(m => m.PlayersModule) },
      { path: 'reports', loadChildren: () => import('./modules/report/report.module').then(m => m.InOutReportModule) },
      { path: 'promotions', loadChildren: () => import('./modules/promotions/promotions.module').then(m => m.PromotionsModule) },
      { path: 'packages', loadChildren: () => import('./modules/packages/packages.module').then(m => m.PackagesModule) },
    ],
  },
];
// const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
