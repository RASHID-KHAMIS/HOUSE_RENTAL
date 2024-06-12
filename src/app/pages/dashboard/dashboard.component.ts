import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  constructor(private router:Router,
    private route:ActivatedRoute,
    private reportService:ReportService){}
  ngOnInit(): void {
    this.report()
  }


  reports:any
  report(){
    this.reportService.dashboardReport().subscribe((resp:any)=>{
      // console.log(resp);
      this.reports = resp;
    })
  }

}
