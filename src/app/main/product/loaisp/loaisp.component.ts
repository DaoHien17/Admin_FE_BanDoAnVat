import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/common/base-component';
import { SanphamService } from 'src/app/core/services/sanpham.service';

import axios from 'axios';
import { environment } from 'src/environments/environment';
import { getLocaleDateFormat } from '@angular/common';

declare var $: any;
@Component({
  selector: 'app-loaisp',
  templateUrl: './loaisp.component.html',
  styleUrls: ['./loaisp.component.css']
})
export class LoaispComponent implements OnInit {
  // public loaisp:any;
  // public list_loaisanphams: any;
  // p: number = 1;
  // total: number = 0;
  // public frmSanPham!: FormGroup;
  // public frmSearch!: FormGroup;
  // public loaiQuyen: string = 'Admin';
  // public file: any;
  // public showUpdateModal: any = false;
  // public doneSetupForm: any;

  // frmloaisp!: FormGroup
  // public updateModal: any;
  // public setupForm: any;
  // public submitted = false;


  // constructor(injector: Injector, private service: LoaispComponent) {
  //   super(injector);
  //   }
  ngOnInit(): void {
    // this.getLoaiSanPham();
    // this.frmloaisp = new FormGroup({
    //   'txt_maloaisp': new FormControl(''),
    //   'txt_tenloaisp': new FormControl(''),

    // });
  }
  // get maloaisp() {
  //   return this.frmloaisp.get('txt_maloaisp')!;
  // }
  // get tenncc() {
  //   return this.frmloaisp.get('txt_tenloaisp')!;
  // }

  // getLoaiSanPham() {

  //   // axios.get(environment.BASE_API + '/api/SanPham/get-all-sanpham').then(res => console.log(res)).catch(err => console.log(err));

  //   this.service.getLoaiSanPham(this.p)
  //     .subscribe((response: any) => {
  //       this.list_loaisanphams = response.data;
  //       this.total = response.total;
  //       // console.log(response);
  //     });

  // }
  // pageChangeEvent(event: number) {
  //   this.p = event;
  //   this.getLoaiSanPham();
  // }

}
