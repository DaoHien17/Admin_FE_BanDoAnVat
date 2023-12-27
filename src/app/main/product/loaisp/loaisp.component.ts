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
export class LoaispComponent extends BaseComponent implements OnInit, AfterViewInit {
  public list_sanphams: any;
  public list_nhacungcaps: any;
  public list_loaisanphams: any;
  p: number = 1;
  total: number = 0;

  public isCreate = false;
  public sanpham: any;

  public frmLoaiSanPham!: FormGroup;
  public frmSearch: FormGroup;
  public loaiQuyen: string = 'Admin';
  public file: any;
  public showUpdateModal: any = false;
  public doneSetupForm: any;
  constructor(injector: Injector, private service: SanphamService) {
    super(injector);
    this.frmSearch = new FormGroup({
      'txt_tenlsp': new FormControl('', []),
    });
  }

  ngOnInit(): void {
    this.LoadData();
  }
  public LoadData() {
      this._api.get('/api/LoaiSanPham/get-loaisanpham').subscribe(res => {
        this.list_loaisanphams = res;
      });
  }

  get tenlsp() {
    return this.frmLoaiSanPham.get('txt_tenlsp')!;
  }
  public createModal() {
    this.showUpdateModal = true;
    this.isCreate = true;
    setTimeout(() => {
      $('#createSanPhamModal').modal('toggle');
      this.doneSetupForm = true;
      this.frmLoaiSanPham = new FormGroup({
        'txt_tenlsp': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]),
      });
    });
  }


  public openUpdateModal(maSanPham: any) {
    this.showUpdateModal = true;
    this.doneSetupForm = false;
    this.isCreate = false;
    setTimeout(() => {
      $('#createSanPhamModal').modal('toggle');
      this._api.get('/api/loaisanpham/get-by-id/' + maSanPham).subscribe(res => {
        this.sanpham = res[0];
        this.frmLoaiSanPham = new FormGroup({
          'txt_tenlsp': new FormControl(this.sanpham.TenLoaiSanPham, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]),
        });
        this.doneSetupForm = true;
      });
    });
  }
  public opendetailSP(maSanPham: any) {
    this.showUpdateModal = true;
    this.doneSetupForm = false;
    this.isCreate = false;
    setTimeout(() => {
      $('#createSanPhamModal').modal('toggle');
      this._api.get('/api/loaisanpham/get-by-id/' + maSanPham).subscribe(res => {
        this.sanpham = res[0];
        this.frmLoaiSanPham = new FormGroup({
          'txt_tenlsp': new FormControl(this.sanpham.TenLoaiSanPham, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]),
        });
        this.doneSetupForm = true;
      });
    });
  }
  public onRemove(MaLoaiSanPham: any) {
    this._api.delete('/api/loaisanpham/delete-loaisanpham', MaLoaiSanPham).subscribe(res => {
      alert('Xóa dữ liệu thành công');
      this.LoadData();
    });
  }
  public closeModal() {
    $('#createSanPhamModal').closest('.modal').modal('hide');
  }
  public pwdCheckValidator(control: any) {
    var filteredStrings = { search: control.value, select: '@#!$%&*' }
    var result = (filteredStrings.select.match(new RegExp('[' + filteredStrings.search + ']', 'g')) || []).join('');
    if (control.value.length < 6 || !result) {
      return { matkhau: true };
    } else {
      return null;
    }
  }
  ngAfterViewInit() {
    this.loadScripts('assets/js/core/app.js', 'assets/js/pages/form_layouts.js');

  }

  pageChangeEvent(event: number) {
    this.p = event;
  }

  public upload(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }
  public findInvalidControls() {
    const invalid = [];
    const controls = this.frmLoaiSanPham.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

  OnSubmit(vl: any) {
    console.log(this.findInvalidControls())
    if (this.frmLoaiSanPham.invalid) {
      return;
    }
    let obj: any = {};
    obj.loaisanpham = {
      TenLoaiSanPham: vl.txt_tenlsp,
    };


    if (this.isCreate) {
      this._api.post('/api/sanpham/create-loaisanpham', obj).subscribe(res => {
        console.log(res)
        if (res.insertId > 0) {
          alert('Thêm dữ liệu thành công');
          this.LoadData();
          this.closeModal();
        } else {
          alert('Có lỗi')
        }
      });
    } else {
      obj.loaisanpham.MaLoaiSanPham = this.sanpham.MaLoaiSanPham;
      this._api.post('/api/sanpham/update-loaisanpham', obj).subscribe(res => {
        if (res.affectedRows > 0) {
          alert('Cập nhật dữ liệu thành công');
          this.LoadData();
          this.closeModal();
        } else {
          alert('Có lỗi')
        }
      });
    }

  }
}
