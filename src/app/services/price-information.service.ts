import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PriceInformationService {

  priceInformationAPI = environment.baseURL + "price-information"
  constructor(private http:HttpClient) { }

  addPriceInfo(body:any){
    return this.http.post(this.priceInformationAPI,body)
  }
}
