import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  houseAPI = environment.baseURL + "houses"
  constructor(private http:HttpClient) { }

  getAllHouses(){
    return this.http.get(this.houseAPI)
  }

  getHouseByID(id:any){
    return this.http.get(this.houseAPI + "/" + id)
  }
}
