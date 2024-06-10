import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginAPI = environment.baseURL + "login-auth/"
  constructor(private http:HttpClient) { }

  registerUser(body:any){
    return this.http.post(this.loginAPI + "registration",body)
  }

  getLogin(username:any,password:any){
    return this.http.get(this.loginAPI + username + "/" + password)
  }

  getAllUsers(){
    return this.http.get(this.loginAPI + "getAllUsers")
  }
}
