import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AddHouseService {

  housesAPI = environment.baseURL + "houses"
  constructor(private http:HttpClient) { }

  getAllHouses(){
    return this.http.get(this.housesAPI)
  }

  addHouse(body:any){
    return this.http.post(this.housesAPI,body)
  }
}
