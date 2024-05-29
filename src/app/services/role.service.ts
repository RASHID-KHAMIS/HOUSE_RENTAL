import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  roleAPI =  environment.baseURL + "roles/"
  constructor(private http:HttpClient) { }

  getAllRoles(){
    return this.http.get(this.roleAPI + "all")
  }

  addRole(body:any){
    return this.http.post(this.roleAPI + "save",body)
  }

  editRole(id:any,body:any){
    return this.http.put(this.roleAPI + "update" + "/" + id,body)
  }

  getRoleByName(name:any){
    return this.http.get(this.roleAPI + "roleByName/" + name)
  }
}
