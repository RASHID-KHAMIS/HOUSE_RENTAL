import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { HouseLocationService } from 'src/app/services/house-location.service';
import { HouseService } from 'src/app/services/house.service';
import { PriceService } from 'src/app/services/price.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-house-details',
  templateUrl: './house-details.component.html',
  styleUrls: ['./house-details.component.css']
})
export class HouseDetailsComponent implements OnInit{

  bookForm!:FormGroup;
  constructor(private router:Router,
    private route:ActivatedRoute,
    private houseLocationService:HouseLocationService,
    private priceService:PriceService,
    private sanitizer:DomSanitizer,
    private customerService:CustomerService,
    private houseService:HouseService){}
  ngOnInit(): void {
    const house =this.route.snapshot.queryParamMap.get('id')
    this.fetchHouseByLocationID(house);
    this.fetchAllPrice();
    this.configureBookingForm();
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

  configureBookingForm(){
    this.bookForm = new FormGroup({
      startDate:new FormControl(null,Validators.required),
      endDate:new FormControl(null,Validators.required),
      totalPrice:new FormControl(null,Validators.required),
      bookingStatus:new FormControl(1),
      house:new FormControl(null),
      customer:new FormControl(null),
      staffId:new FormControl(null),
      roleId:new FormControl(null)
    })
  }

  onSubmit(){
   
    this.customerService.getCustomerInfoByUserID(sessionStorage.getItem("user_id")).subscribe((resp:any)=>{

      this.bookForm.patchValue({customer:resp});  
    });
    this.houseService.getHouseByID(this.route.snapshot.queryParamMap.get('id')).subscribe((response:any)=>{
      this.bookForm.patchValue({house:response});
      const values = this.bookForm.value;
      console.log(values);
    })

  
  }

  

}
