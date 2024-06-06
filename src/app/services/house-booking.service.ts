import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class HouseBookingService {


  houseBookingAPI = environment.baseURL + "house-bookings"
  constructor(private http:HttpClient) { }

  addHouseBooking(body:any){
    return this.http.post(this.houseBookingAPI,body)
  }
}
