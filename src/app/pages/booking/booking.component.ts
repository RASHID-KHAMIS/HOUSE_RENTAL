import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HouseBookingService } from 'src/app/services/house-booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit{

  constructor(private router:Router,
    private route:ActivatedRoute,
    private houseBookingService:HouseBookingService,
    private sanitizer:DomSanitizer,){}
  ngOnInit(): void {
    const houseBooking =this.route.snapshot.queryParamMap.get('id')
;    
   this.fetchAllBookedByCustomerID(houseBooking);
  }


  bookings:any;
  imageSource1:any;
  check:boolean = false;
  fetchAllBookedByCustomerID(custID:any){
    this.check =true;
    this.houseBookingService.getBookingByCustomerID(custID).subscribe((resp:any)=>{
      this.bookings = resp;
      this.check = false;
      
    })
  }

   displayImage(url:any){
    return 'data:image/png;base64,' + url
  }

  onLogOut(){
    
  }

}
