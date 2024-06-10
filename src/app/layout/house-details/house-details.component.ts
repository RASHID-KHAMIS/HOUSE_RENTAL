import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { HouseBookingService } from 'src/app/services/house-booking.service';
import { HouseLocationService } from 'src/app/services/house-location.service';
import { HouseService } from 'src/app/services/house.service';
import { PriceService } from 'src/app/services/price.service';
import Swal from 'sweetalert2';
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
    private houseService:HouseService,
    private houseBookingService:HouseBookingService){}
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
      bookingDescription:new FormControl(null,Validators.required),
      bookingStatus:new FormControl(0),
      house:new FormControl(null),
      customer:new FormControl(null),
      staffId:new FormControl(null)
    })
  }

  onSubmit(){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure you want to book this house ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, book this house !",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        const userId = sessionStorage.getItem("user_id");
        const houseId = this.route.snapshot.queryParamMap.get('id');
        
        if (userId && houseId) {
          this.customerService.getCustomerInfoByUserID(userId).subscribe((resp: any) => {
            this.bookForm.patchValue({ customer: resp });
            
            this.houseService.getHouseByID(houseId).subscribe((response: any) => {
              this.bookForm.patchValue({ house: response });
              const values = this.bookForm.value;
        
              this.houseBookingService.addHouseBooking(values).subscribe((resp: any) => {
                Swal.fire({
                  title: "Booking has been added successfully!",
                  text: "Please wait, your booking is being processed by our staff.",
                  icon: "success"
                });
                console.log(resp);
                
        
                setTimeout(() => {
                  this.router.navigate(["booking"]);
                  // this.router.navigate(['admin/view-house'],{queryParams:{id:resp.house_booking_id}})
                }, 3000);
              });
            }, (error: any) => {
              // Handle error for houseService.getHouseByID
              Swal.fire({
                title: "Error!",
                text: "Failed to fetch house details.",
                icon: "error"
              });
            });
          }, (error: any) => {
            // Handle error for customerService.getCustomerInfoByUserID
            Swal.fire({
              title: "Error!",
              text: "Failed to fetch customer information.",
              icon: "error"
            });
          });
        } else {
          if (!userId) {
            console.error("User ID not found in sessionStorage");
            Swal.fire({
              title: "Error!",
              text: "Login First or Sign Up for new User ",
              icon: "error"
            });
          }
          if (!houseId) {
            console.error("House ID not found in query parameters");
            Swal.fire({
              title: "Error!",
              text: "House ID not found in query parameters.",
              icon: "error"
            });
          }
        }
        
        
      
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Booking was cancelled)",
          icon: "error"
        });
      }
    });
  }

  

}
