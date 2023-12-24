import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SanphamService {
  private base_url = environment.BASE_API;
  constructor(private httpClient: HttpClient) { }
  getSanPham(page: number){
    return this.httpClient.get(this.base_url + '/api/SanPham/get-all-sanpham');
  }
}
