import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HouseLocationService } from 'src/app/services/house-location.service';
import { PriceService } from 'src/app/services/price.service';

@Component({
  selector: 'app-house-details',
  templateUrl: './house-details.component.html',
  styleUrls: ['./house-details.component.css']
})
export class HouseDetailsComponent implements OnInit{

  constructor(private router:Router,
    private route:ActivatedRoute,
    private houseLocationService:HouseLocationService,
    private priceService:PriceService,
    private sanitizer:DomSanitizer){}
  ngOnInit(): void {
    const house =this.route.snapshot.queryParamMap.get('id')
    this.fetchHouseByLocationID(house);
    this.fetchAllPrice()
  }


  houses:any;
  imageSource1:any;
  region:any;
  district:any;
  houseLocation:any;
  fetchHouseByLocationID(id:any){
    this.houseLocationService.getHouseInfoByLocationID(id).subscribe((resp:any)=>{
      this.houses = resp;
      this.imageSource1 = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${resp.imageUrl}`);
      this.region = resp.region_name;
      this.district = resp.district_name;

      this.houseLocationService.getByRegionAndDistrict(this.region,this.district).subscribe((response:any)=>{
        this.houseLocation = response;
      })
    })
  }

  displayImage(url:any){
    return 'data:image/png;base64,' + url
  }

  priceInfo:any;
  fetchAllPrice(){
    this.priceService.getAllPrice().subscribe((resp:any)=>{
      this.priceInfo = resp;    
    })
  }

  

}
