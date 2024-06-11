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

  getAllHouseLocation(){
    return this.http.get(this.houseLocationAPI + "allHouseLocation")
  }

  getHouseInfoByLocationID(id:any){
    return this.http.get(this.houseLocationAPI + "by-id/" + id)
  }

  getRecentHouse(){
    return this.http.get(this.houseLocationAPI + "getRecentHouses")
  }

  getHouseLocationWithLimit(num:any){
    return this.http.get(this.houseLocationAPI + "last-eight-house/" + num)
  }

  getByRegionAndDistrict(region:any,district:any){
    return this.http.get(this.houseLocationAPI + "house-search-by-region-district/" + region + "/" + district)
  }

  getHouseLocationByRegion(region:any){
    return this.http.get(this.houseLocationAPI + "house-search-by-region/" + region)
  }
}
