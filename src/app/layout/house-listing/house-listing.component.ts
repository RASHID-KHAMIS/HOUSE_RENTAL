import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HouseBookingService } from 'src/app/services/house-booking.service';
import { HouseLocationService } from 'src/app/services/house-location.service';
import { PriceService } from 'src/app/services/price.service';

interface Y {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-house-listing',
  templateUrl: './house-listing.component.html',
  styleUrls: ['./house-listing.component.css']
})
export class HouseListingComponent implements OnInit{

  types: Y[] = [
    {value: 'FLOOR HOUSE', viewValue: 'FLOOR HOUSE'},
    {value: 'NORMAL HOUSE', viewValue: 'NORMAL HOUSE'},
  ];

  house_booking_data: any;
  searchForm!:FormGroup;

  constructor(private router:Router,
    private route:ActivatedRoute,
    private houseLocationService:HouseLocationService,
    private priceService:PriceService,
    private house_booking_services: HouseBookingService,
    private sanitizer:DomSanitizer){}
  ngOnInit(): void {
    this.fetchHousePicture();
    this.fetchAllPrice();
    this.fetchRecentHouse();
    this.getAllBookedHouses();
    this.configureForm()
  }


  check_data_exist: boolean = false;
  getAllBookedHouses(){
    this.house_booking_services.getBookedHouse().subscribe((resp:any)=>{
      this.house_booking_data = resp;
      if(resp.length > 0){
        this.check_data_exist = false;
      }else{
        this.check_data_exist = true;
      }
    });
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


  onView(house:any){

    this.router.navigate(['/house-details'],{queryParams:{id:house.location_id}}).then(()=>{
      location.reload();
    })
  }

  configureForm(){
    this.searchForm = new FormGroup({
      type:new FormControl(null)
    })
  }


  searchCar(){
    const values = this.searchForm.value;
    console.log(values);
    
  }


 

}
