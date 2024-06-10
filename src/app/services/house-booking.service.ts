import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class HouseBookingService {


  houseBookingAPI = environment.baseURL + "house-bookings"
  constructor(private http:HttpClient) { }

  addHouseBooking(body:any){
    return this.http.post(this.houseBookingAPI + "/add-booking",body);
  }

  getBookedHouse():Observable<any>{
    return this.http.get(this.houseBookingAPI + "/booked-house");
  }

  getAllBooked(){
    return this.http.get(this.houseBookingAPI)
  }

  getBookingByCustomerID(id:any){
    return this.http.get(this.houseBookingAPI + "/my-bookings/" + id)
  }

  getAllBooking(){
    return this.http.get(this.houseBookingAPI)
  }

  getByHouseBookingID(id:any){
    return this.http.get(this.houseBookingAPI + "/" + id)
  }
}
