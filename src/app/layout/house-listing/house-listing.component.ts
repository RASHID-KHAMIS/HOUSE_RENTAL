import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HouseLocationService } from 'src/app/services/house-location.service';
import { PriceService } from 'src/app/services/price.service';

@Component({
  selector: 'app-house-listing',
  templateUrl: './house-listing.component.html',
  styleUrls: ['./house-listing.component.css']
})
export class HouseListingComponent implements OnInit{

  constructor(private router:Router,
    private route:ActivatedRoute,
    private houseLocationService:HouseLocationService,
    private priceService:PriceService,
    private sanitizer:DomSanitizer){}
  ngOnInit(): void {
    this.fetchHousePicture();
    this.fetchAllPrice();
    this.fetchRecentHouse();
  }

  houses:any;
  houseNumber:any;
  fetchHousePicture(){
    this.houseLocationService.getAllHouseLocation().subscribe((resp:any)=>{
      this.houses = resp;
      this.houseNumber = resp.length;     
    })
  }

  priceInfo:any;
  fetchAllPrice(){
    this.priceService.getAllPrice().subscribe((resp:any)=>{
      this.priceInfo = resp; 
    })
  }

  displayImage(url:any){
    return `data:image/png;base64,` + url;
  }

  recentHouses:any;
  fetchRecentHouse(){
    this.houseLocationService.getRecentHouse().subscribe((response:any)=>{
      this.recentHouses =response;
      
    })
  }

  searchCar(){
    
  }

  onView(house:any){

    this.router.navigate(['/house-details'],{queryParams:{id:house.location_id}}).then(()=>{
      location.reload();
    })
  }

}
