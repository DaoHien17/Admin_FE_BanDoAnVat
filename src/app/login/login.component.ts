import { AuthenticationService } from './../core/authentication/authentication.service';
import { Component, OnInit,Injector } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ApiService } from '../core/services/api.service';
import { environment } from '../../environments/environment';
import Axios from 'axios';
import axios from 'axios';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public frmLogin!: FormGroup;
  public submitted = false;
  public loading = false;
  public returnUrl!: string;
  public error = '';
  public _api:ApiService;

  constructor(private authenticationService: AuthenticationService, private router: Router, private route: ActivatedRoute, injector: Injector) {
    this._api = injector.get(ApiService);
    if (this.authenticationService.userValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.frmLogin = new FormGroup({
      'txt_taikhoan': new FormControl('', [Validators.required]),
      'txt_matkhau': new FormControl('', [Validators.required]),
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get taikhoan() {
    return this.frmLogin.get('txt_taikhoan')!;
  }
  get matkhau() {
    return this.frmLogin.get('txt_matkhau')!;
  }
  public Login(vl: any) {

    this.submitted = true;
    // stop here if form is invalid
    if (this.frmLogin.invalid) {
      return;
    }
    this.loading = true;


    axios.post('http://localhost:3000/api/User/authenticate', {
        username: vl.txt_taikhoan,
        password: vl.txt_matkhau,
      }).then(res => {
        localStorage.setItem('user', JSON.stringify(res.data));
        alert('Logging...');
        window.open("http://localhost:4200/sanpham");
      }).catch(err => alert('Sai tk, mk'));
    }
}
