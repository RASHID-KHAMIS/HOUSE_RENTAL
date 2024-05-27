import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HouseLocationService } from 'src/app/services/house-location.service';

@Component({
  selector: 'app-house-listing',
  templateUrl: './house-listing.component.html',
  styleUrls: ['./house-listing.component.css']
})
export class HouseListingComponent implements OnInit{

  constructor(private router:Router,
    private route:ActivatedRoute,
    private houseLocationService:HouseLocationService,
    private sanitizer:DomSanitizer){}
  ngOnInit(): void {
    this.fetchHousePicture()
  }

  houses:any;
  imageSource1:any;

  fetchHousePicture(){
    this.houseLocationService.getAllHouseLocation().subscribe((resp:any)=>{
      console.log(resp);
      this.houses = resp;
      this.imageSource1 = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${resp.imageUrl}`);
      console.log(this.imageSource1);
      
    })
  }
  searchCar(){
    
  }

}
