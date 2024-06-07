import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class StaffService {


  staffAPI = environment.baseURL + "staff"
  constructor(private http:HttpClient) { }

  addStaff(body:any){
    return this.http.post(this.staffAPI,body)
  }

  getAllStaff(){
    return this.http.get(this.staffAPI)
  }
}
