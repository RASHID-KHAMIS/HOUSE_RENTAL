import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  priceAPI = environment.baseURL + "price-information" 
  constructor(private http:HttpClient) { }

  getAllPrice(){
    return this.http.get(this.priceAPI)
  }
}
