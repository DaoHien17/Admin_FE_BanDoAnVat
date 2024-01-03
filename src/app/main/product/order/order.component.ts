import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/common/base-component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SanphamService } from 'src/app/core/services/sanpham.service';
declare var $: any;
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent extends BaseComponent implements OnInit {

  public list_sanphams: any;
  public list_nhacungcaps: any;
  public list_loaisanphams: any;
  public list_chitietthanhtoans: any;
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
      'txt_tenncc': new FormControl('', []),
    });
  }

  ngOnInit(): void {
    this.LoadData();
  }
  public LoadData() {
      this._api.get('/api/order/getAllOrder').subscribe(res => {
        this.list_loaisanphams = res;
      });
  }

  get tenncc() {
    return this.frmLoaiSanPham.get('txt_tenncc')!;
  }
  get diachi() {
    return this.frmLoaiSanPham.get('txt_diachi')!;
  }
  get sodienthoai() {
    return this.frmLoaiSanPham.get('txt_sodienthoai')!;
  }
  get email() {
    return this.frmLoaiSanPham.get('txt_email')!;
  }
  public createModal() {
    this.showUpdateModal = true;
    this.isCreate = true;
    setTimeout(() => {
      $('#createSanPhamModal').modal('toggle');
      this.doneSetupForm = true;
      this.frmLoaiSanPham = new FormGroup({
        'txt_tenncc': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]),
        'txt_diachi': new FormControl('', [Validators.required]),
        'txt_sodienthoai': new FormControl('', [Validators.required]),
        'txt_email': new FormControl('', [Validators.required]),
      });
    });
  }


  public openUpdateModal(maSanPham: any) {
    this.showUpdateModal = true;
    this.doneSetupForm = false;
    this.isCreate = false;
    setTimeout(() => {
      $('#createSanPhamModal').modal('toggle');
      this._api.get('/api/order/get-by-id/' + maSanPham).subscribe(res => {
        this.list_chitietthanhtoans = res;
      })
    });
  }
  public opendetailSP(maSanPham: any) {
    this.showUpdateModal = true;
    this.doneSetupForm = false;
    this.isCreate = false;
    setTimeout(() => {
      $('#createSanPhamModal').modal('toggle');
      this._api.get('/api/order/get-by-id/' + maSanPham).subscribe(res => {
        this.list_chitietthanhtoans = res;
      })
    });
  }
  public onRemove(MaLoaiSanPham: any) {
    this._api.delete('/api/nhacungcap/delete-nhacungcap', MaLoaiSanPham).subscribe(res => {
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
    obj.nhacungcap = {
      TenNhaCungCap: vl.txt_tenncc,
      DiaChi: vl.txt_diachi,
      SoDienThoai: vl.txt_sodienthoai,
      Email: vl.txt_email,
    };


    if (this.isCreate) {
      this._api.post('/api/sanpham/create-nhacungcap', obj).subscribe(res => {
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
      obj.nhacungcap.MaNhaCungCap = this.sanpham.MaNhaCungCap;
      this._api.post('/api/sanpham/update-nhacungcap', obj).subscribe(res => {
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
