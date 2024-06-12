import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportService } from 'src/app/services/report.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  private map: any;
  ngAfterViewInit(): void {
    this.initMap();
  }
  constructor(private router:Router,
    private route:ActivatedRoute,
    private reportService:ReportService){}
  ngOnInit(): void {
    this.report()
  }

  private initMap(): void {
    // Define the geographical bounds for Zanzibar
    const zanzibarBounds = L.latLngBounds(
      L.latLng(-6.391, 39.051), // Southwest corner
      L.latLng(-5.927, 39.334)  // Northeast corner
    );
  
    // Initialize the map and set the center to Zanzibar
    this.map = L.map('map', {
      center: [-6.1659, 39.2026],  // Zanzibar coordinates
      zoom: 10,                    // Adjust the zoom level as needed
      maxBounds: zanzibarBounds,   // Set the bounds to restrict the view
      maxBoundsViscosity: 1.0,     // Makes the map bounce back when trying to move out of bounds
      minZoom: 10,                 // Restrict zoom level to keep focus on Zanzibar
      maxZoom: 18                  // Maximum zoom level
    });
  
    // Add OpenStreetMap tiles
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
  
    tiles.addTo(this.map);
  }

  reports:any
  report(){
    this.reportService.dashboardReport().subscribe((resp:any)=>{
      // console.log(resp);
      this.reports = resp;
    })
  }

}
