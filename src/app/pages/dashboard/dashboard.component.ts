import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportService } from 'src/app/services/report.service';
import * as L from 'leaflet';
import { marker } from 'leaflet';
import { HouseService } from 'src/app/services/house.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  private map: any;
  ngAfterViewInit(): void {
    // this.initMap();
  }
  constructor(private router:Router,
    private route:ActivatedRoute,
    private reportService:ReportService,
    private houseService:HouseService){}
  ngOnInit(): void {
    this.report();
    this.location()
  }

  // private initMap(): void {

  //   const zanzibarBounds = L.latLngBounds(
  //     L.latLng(-6.391, 39.051), 
  //     L.latLng(-5.927, 39.334)  
  //   );
  
   
  //   this.map = L.map('map', {
  //     center: [-6.1659, 39.2026], 
  //     zoom: 10,                   
  //     maxBounds: zanzibarBounds,   
  //     maxBoundsViscosity: 1.0,     
  //     minZoom: 10,                 
  //     maxZoom: 18                 
  //   });
  
   
  //   const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //     maxZoom: 18,
  //     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  //   });
  
  //   tiles.addTo(this.map);
  // }

  reports:any
  report(){
    this.reportService.dashboardReport().subscribe((resp:any)=>{
      this.reports = resp;
    })
  }

  location(){
    const map = L.map('map').setView([-6.1659, 39.2026], 9);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // L.marker([-6.1659, 39.2026]).addTo(map).openPopup();

      this.houseService.getAllHouses().subscribe((resp:any)=>{
        if (resp.length > 0) {
          for(let z = 0; z < resp.length; z++){            
            const unguja = marker([resp[z].latitude, resp[z].longitude]).addTo(map).
            bindPopup("<h5><b style='color:green;'> House Name:" + resp[z].title + 
            "<br> Type : " + resp[z].type +
            " <br> Address : " + resp[z].address + 
            "<h5><b>");
          }
        }
        
      })
  }

}
