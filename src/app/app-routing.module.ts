import { AuthGuard } from './core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { SanphamComponent } from './main/product/sanpham/sanpham.component';
import { LoaispComponent } from './main/product/loaisp/loaisp.component';
import { NhacungcapComponent } from './main/product/nhacungcap/nhacungcap.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./main/main.module').then(m => m.MainModule), canActivate: [AuthGuard] },
   { path: 'sanpham', component: SanphamComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'loaisp', component: LoaispComponent },
  { path: 'ncc', component: NhacungcapComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
