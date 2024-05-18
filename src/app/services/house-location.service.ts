import { HttpClient } from '@angular/common/http';
import { Injectable, booleanAttribute } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class HouseLocationService {

  houseLocationAPI = environment.baseURL + "house-location/"
  constructor(private http:HttpClient) { }

  addHouseLocation(region:any,distict:any,other:any,house:any,body:any){
    return this.http.post(this.houseLocationAPI + "create/" + region + "/" + distict + "/" + other + "/" + house,body)
  }
}
