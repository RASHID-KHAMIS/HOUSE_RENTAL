import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HouseBookingService } from 'src/app/services/house-booking.service';

@Component({
  selector: 'app-view-booking',
  templateUrl: './view-booking.component.html',
  styleUrls: ['./view-booking.component.css']
})
export class ViewBookingComponent implements OnInit{

  viewBookingForm!:FormGroup;
  constructor(private router:Router,
    private route:ActivatedRoute,
    private houseBookingService:HouseBookingService
    ){}
  ngOnInit(): void {
    const booking =this.route.snapshot.queryParamMap.get('id');
    this.fetchBookingInfo(booking);
    this.configureForm();
  }


  bookings:any
  fetchBookingInfo(id:any){
    this.houseBookingService.getByHouseBookingID(id).subscribe((resp:any)=>{
      console.log(resp);
      this.viewBookingForm = new FormGroup({
        house_booking_id:new FormControl(resp.house_booking_id),
        house:new FormControl(resp.house),
        houseTitle:new FormControl(resp.house.title),
      })
    })
  }

  configureForm(){
    this.viewBookingForm = new FormGroup({
      house_booking_id:new FormControl(null),
      bookingNumber:new FormControl(null),
      house:new FormControl(null),
      customer:new FormControl(null),
      startDate:new FormControl(null),
      endDate:new FormControl(null),
      totalPrice:new FormControl(null),
      bookingStatus:new FormControl(null),
      bookingDescription:new FormControl(null),
      staffId:new FormControl(null),

      houseTitle: new FormControl(null),
    })
  }

  onBack(){

  }

}
