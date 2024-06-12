import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  paymentAPI = environment.baseURL + "payments/"
  constructor(private http:HttpClient) { }

  addPayment(bookingId:any,customerId:any,body:any){
    return this.http.post(this.paymentAPI + "create/" + bookingId + "/" + customerId + "/",body)
  }

  getAllPayment(){
    return this.http.get(this.paymentAPI + "all")
  }
}
