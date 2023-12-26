import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/common/base-component';
import { SanphamService } from 'src/app/core/services/sanpham.service';

import axios from 'axios';
import { environment } from 'src/environments/environment';
import { getLocaleDateFormat } from '@angular/common';

declare var $: any;
@Component({
  selector: 'app-sanpham',
  templateUrl: './sanpham.component.html',
  styleUrls: ['./sanpham.component.css']
})
export class SanphamComponent extends BaseComponent implements OnInit, AfterViewInit {
  public list_sanphams: any;
  public list_nhacungcaps: any;
  public list_loaisanphams: any;
  p: number = 1;
  total: number = 0;

  public isCreate = false;
  public sanpham: any;

  public frmSanPham!: FormGroup;
  public frmSearch: FormGroup;
  public loaiQuyen: string = 'Admin';
  public file: any;
  public showUpdateModal: any = false;
  public doneSetupForm: any;
  constructor(injector: Injector, private service: SanphamService) {
    super(injector);
    this.frmSearch = new FormGroup({
      'txt_tensp': new FormControl('', []),

    });
  }

  ngOnInit(): void {
    this.LoadData();
    this.getSanPham();
  }
  public LoadData() {
    this._api.post('/api/sanpham/search', { page: 1, pageSize: 10, tensp: this.frmSearch.value['txt_tensp'] }).subscribe(res => {
      this.list_sanphams = res;

      setTimeout(() => {
        this.loadScripts(
          'assets/js/core/app.js',
          'assets/js/pages/datatables_basic.js',
          'assets/js/pages/datatables_basic.js'
        );
      });
    });
  }

  get tensp() {
    return this.frmSanPham.get('txt_tensp')!;
  }
  get loai() {
    return this.frmSanPham.get('txt_loai')!;
  }

  get ncc() {
    return this.frmSanPham.get('txt_ncc')!;
  }
  get mota() {
    return this.frmSanPham.get('txt_mota')!;
  }
  get dongia() {
    return this.frmSanPham.get('txt_dongia')!;
  }



  get anh() {
    return this.frmSanPham.get('txt_anh')!.value;
  }


  public createModal() {
    this.showUpdateModal = true;
    this.isCreate = true;
    setTimeout(() => {
      $('#createSanPhamModal').modal('toggle');
      this.doneSetupForm = true;
      this.frmSanPham = new FormGroup({
        'txt_tensp': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]),
        'txt_loai': new FormControl('', [Validators.required]),
        'txt_ncc': new FormControl('', [Validators.required]),
        'txt_mota': new FormControl('', [Validators.required]),
        'txt_dongia': new FormControl('', [Validators.required]),
        'txt_anh': new FormControl('', []),
      });
      this._api.get('/api/NhaCungCap/get-NhaCungCap').subscribe(res => {
        this.list_nhacungcaps = res;

      });
      this._api.get('/api/LoaiSanPham/get-loaisanpham').subscribe(res => {
        this.list_loaisanphams = res;

      });
    });
  }


  public openUpdateModal(maSanPham: any) {
    this.showUpdateModal = true;
    this.doneSetupForm = false;
    this.isCreate = false;
    setTimeout(() => {
      $('#createSanPhamModal').modal('toggle');
      this._api.get('/api/sanpham/get-by-id/' + maSanPham).subscribe(res => {
        this.sanpham = res[0];
        this.frmSanPham = new FormGroup({
          'txt_tensp': new FormControl(this.sanpham.TenSP, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]),
          'txt_loai': new FormControl(this.sanpham.maLoai, [Validators.required]),
          'txt_ncc': new FormControl(this.sanpham.maNCC, [Validators.required]),
          'txt_mota': new FormControl(this.sanpham.MoTa, [Validators.required]),
          'txt_dongia': new FormControl(this.sanpham.DonGia, [Validators.required]),
          'txt_anh': new FormControl(this.sanpham.Anh, []),
        });
        this.doneSetupForm = true;
        this._api.get('/api/NhaCungCap/get-NhaCungCap').subscribe(res => {
          this.list_nhacungcaps = res;
        });
        this._api.get('/api/LoaiSanPham/get-loaisanpham').subscribe(res => {
          this.list_loaisanphams = res;
        });
      });
    });
  }
  public opendetailSP(maSanPham: any) {
    this.showUpdateModal = true;
    this.doneSetupForm = false;
    this.isCreate = false;
    setTimeout(() => {
      $('#createSanPhamModal').modal('toggle');
      this._api.get('/api/sanpham/get-by-id/' + maSanPham).subscribe(res => {
        this.sanpham = res[0];
        this.frmSanPham = new FormGroup({
          'txt_tensp': new FormControl(this.sanpham.TenSP, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]),
          'txt_loai': new FormControl(this.sanpham.maLoai, [Validators.required]),
          'txt_ncc': new FormControl(this.sanpham.maNCC, [Validators.required]),
          'txt_mota': new FormControl(this.sanpham.MoTa, [Validators.required]),
          'txt_dongia': new FormControl(this.sanpham.DonGia, [Validators.required]),
          'txt_anh': new FormControl(this.sanpham.Anh, [Validators.required]),
        });
        this.doneSetupForm = true;
        this._api.get('/api/NhaCungCap/get-NhaCungCap').subscribe(res => {
          this.list_nhacungcaps = res;
        });
        this._api.get('/api/LoaiSanPham/get-loaisanpham').subscribe(res => {
          this.list_loaisanphams = res;
        });
      });
    });
  }
  public onRemove(MaSanPham: any) {
    this._api.delete('/api/sanpham/delete-sanpham', MaSanPham).subscribe(res => {
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

  getSanPham() {

    // axios.get(environment.BASE_API + '/api/SanPham/get-all-sanpham').then(res => console.log(res)).catch(err => console.log(err));

    this.service.getSanPham(this.p)
      .subscribe((response: any) => {
        this.list_sanphams = response;
        this.total = response;
      });

  }
  pageChangeEvent(event: number) {
    this.p = event;
    this.getSanPham();
  }

  public upload(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }
  public findInvalidControls() {
    const invalid = [];
    const controls = this.frmSanPham.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

  OnSubmit(vl: any) {
    console.log(this.findInvalidControls())
    if (this.frmSanPham.invalid) {
      return;
    }
    let obj: any = {};
    obj.sanpham = {
      TenSanPham: vl.txt_tensp,
      MaLoaiSanPham: vl.txt_loai,
      MaNhaCungCap: vl.txt_ncc,
      MoTaSanPham: vl.txt_mota,
      DonGia: vl.txt_dongia,
      AnhDaiDien: vl.txt_anh,
    };

    obj.giasanpham = {
      Gia: vl.txt_dongia,
    };


    if (this.isCreate) {
      if (this.file && false) {
        this._api.uploadFileSingle('/api/upload/upload-single', 'sanpham', this.file).subscribe((res: any) => {
          if (res && res.body && res.body.filePath) {
            obj.sanpham.AnhDaiDien = res.body.filePath;
            this._api.post('/api/sanpham/create-sanpham', obj).subscribe(res => {
              console.log(res)
              console.log(res.data)
              if (res.status == 200) {
                alert('Thêm dữ liệu thành công');
                this.LoadData();
                this.closeModal();
              } else {
                alert('Có lỗi')
              }
            });
          }
        });
      } else {
        this._api.post('/api/sanpham/create-sanpham', obj).subscribe(res => {
          console.log(res)
          if (res.insertId > 0) {
            alert('Thêm dữ liệu thành công');
            this.LoadData();
            this.closeModal();
          } else {
            alert('Có lỗi')
          }
        });
      }
    } else {
      obj.sanpham.MaSanPham = this.sanpham.MaSanPham;
      obj.giasanpham.MaSanPham = this.sanpham.MaSanPham;

      if (this.file && false) {
        this._api.uploadFileSingle('/api/upload/upload-single', 'sanpham', this.file).subscribe((res: any) => {
          if (res && res.body && res.body.filePath) {
            obj.sanpham.AnhDaiDien = res.body.filePath;
            this._api.post('/api/sanpham/update-sanpham', obj).subscribe(res => {
              if (res && res.data) {
                alert('Cập nhật dữ liệu thành công');
                this.LoadData();
                this.closeModal();
              } else {
                alert('Có lỗi')
              }
            });
          }
        });
      } else {
        this._api.post('/api/sanpham/update-sanpham', obj).subscribe(res => {
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
}
