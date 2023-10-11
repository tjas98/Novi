import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  //private url = "http://localhost:3000/api/";
  //private url = "http://52.59.252.12:3000/api/"
  //private url = "http://3.70.237.147:3000/api/"
  private url = "https://server-cwg1.onrender.com/api/"

  constructor(
    private http: HttpClient
  ) { }


  get(niz: any) {
    return this.http.get(this.url + niz);
  }

  post(niz: any, body: any) {
    return this.http.post(this.url + niz, body);
  }
}
