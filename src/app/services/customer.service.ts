import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customerAPI =environment.baseURL + "customers"
  constructor(private http:HttpClient) { }

  addCustomer(body:any){
    return this.http.post(this.customerAPI,body)
  }

  getAllCustomer(){
    return this.http.get(this.customerAPI)
  }
}
