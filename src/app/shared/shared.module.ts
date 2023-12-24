import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { TopbarComponent } from './layout/topbar/topbar.component';


@NgModule({
  declarations: [
      FooterComponent,
      SidebarComponent,
       UnauthorizedComponent,
       NotFoundComponent,
       TopbarComponent
  ],
  exports: [

    FooterComponent,
    SidebarComponent,
    TopbarComponent,
    UnauthorizedComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule    
  ]
})
export class SharedModule { }
