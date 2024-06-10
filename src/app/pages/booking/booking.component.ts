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
   this.fetchAllBooked();
  }


  bookings:any;
  imageSource1:any;
  fetchAllBooked(){
    this.houseBookingService.getAllBooked().subscribe((resp:any)=>{
      console.log(resp);
      this.bookings = resp;
      this.imageSource1 = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${resp.imageUrl}`);
      
    })
  }

}
