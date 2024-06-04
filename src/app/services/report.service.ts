import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  reportAPI = environment.baseURL + "report/"
  constructor(private http:HttpClient) { }

  dashboardReport(){
    return this.http.get(this.reportAPI + "summary")
  }
}
