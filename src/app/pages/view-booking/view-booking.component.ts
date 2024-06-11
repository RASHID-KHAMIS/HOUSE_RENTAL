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
      this.viewBookingForm = new FormGroup({
        house_booking_id:new FormControl(resp.house_booking_id),
        house:new FormControl(resp.house),
        houseTitle:new FormControl(resp.house.title),
        houseType:new FormControl(resp.house.type),
        houseSize:new FormControl(resp.house.size),
        houseBedrooms:new FormControl(resp.house.bedrooms),
        houseBathrooms:new FormControl(resp.house.bathrooms),
        houseAddress:new FormControl(resp.house.address),
        otherDetails:new FormControl(resp.house.otherDetails),

        customer:new FormControl(resp.customer),
        customerFName:new FormControl(resp.customer.firstName),
        customerLName:new FormControl(resp.customer.lastName),
        customerEmail:new FormControl(resp.customer.email),
        customerPhoneNumber:new FormControl(resp.customer.phoneNumber),
        customerAddress:new FormControl(resp.customer.address),
        customerNationalIdNumber:new FormControl(resp.customer.nationalIdNumber),
        startDate:new FormControl(resp.startDate),
        endDate:new FormControl(resp.endDate),
        totalPrice:new FormControl(resp.totalPrice),
        bookingDescription:new FormControl(resp.bookingDescription),
        bookingNumber:new FormControl(resp.bookingNumber),
        bookingStatus:new FormControl(1),
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
      houseType: new FormControl(null),
      houseSize: new FormControl(null),
      houseBedrooms: new FormControl(null),
      houseBathrooms: new FormControl(null),
      houseAddress: new FormControl(null),
      otherDetails: new FormControl(null),

      customerFName:new FormControl(null),
      customerLName:new FormControl(null),
      customerEmail:new FormControl(null),
      customerPhoneNumber:new FormControl(null),
      customerAddress:new FormControl(null),
      customerNationalIdNumber:new FormControl(null),
    })
  }


  onSave(){
    const formValues = this.viewBookingForm.value;

  // Create a copy of the form values and remove the undesired fields
  const submissionData = { ...formValues };
  delete submissionData.customerFName;
  delete submissionData.customerLName;
  delete submissionData.customerEmail;
  delete submissionData.customerPhoneNumber;
  delete submissionData.customerAddress;
  delete submissionData.houseTitle;
  delete submissionData.houseType;
  delete submissionData.houseSize;
  delete submissionData.houseBedrooms;
  delete submissionData. houseBathrooms;
  delete submissionData.houseAddress;
  delete submissionData.otherDetails;
  delete submissionData.customerNationalIdNumber;

  console.log(submissionData);
  }


  onBack(){

  }

}
