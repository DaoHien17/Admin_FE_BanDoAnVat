import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrderComponent } from './order/order.component';
import { SellComponent } from './sell/sell.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SanphamComponent } from './sanpham/sanpham.component';
import { CommonModule } from '@angular/common';
import { LoaispComponent } from './loaisp/loaisp.component';
import { NhacungcapComponent } from './nhacungcap/nhacungcap.component';

@NgModule({
  declarations: [SanphamComponent, OrderComponent, SellComponent, LoaispComponent, NhacungcapComponent ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'order',
        component: OrderComponent,
      },
      {
        path: 'sell',
        component: SellComponent,
      },
      {
        path: 'sanpham',
        component: SanphamComponent,
      },
  ]),  
  ]
})
export class ProductModule { }
