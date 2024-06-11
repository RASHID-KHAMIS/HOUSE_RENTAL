import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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

  regions: Y[] = [
    {value: 'MJINI MAGHARIBI', viewValue: 'MJINI MAGHARIBI'},
    {value: 'KASKAZINI UNGUJA', viewValue: 'KASKAZINI UNGUJA'},
    {value: 'KUSINI UNGUJA', viewValue: 'KUSINI UNGUJA'},
  ];

  house_booking_data: any;
  onSerchForm!:FormGroup;

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

  searchCar(){
    
  }

  onView(house:any){

    this.router.navigate(['/house-details'],{queryParams:{id:house.location_id}}).then(()=>{
      location.reload();
    })
  }

  onRegionChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    console.log('Selected region:', selectedValue);
    // Do something with the selected value
  }

  searchByRegion(){

  }

}
