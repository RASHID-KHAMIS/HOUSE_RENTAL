import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HouseBookingService } from 'src/app/services/house-booking.service';
import { PaymentService } from 'src/app/services/payment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit{

  paymentForm!:FormGroup;
  constructor(private router:Router,
    private route:ActivatedRoute,
    private houseBookingService:HouseBookingService,
    private sanitizer:DomSanitizer,
    private paymentService:PaymentService){}
  ngOnInit(): void {
    this.configureForm();
    const houseBooking =this.route.snapshot.queryParamMap.get('id')
;    
   this.fetchAllBookedByCustomerID(houseBooking);
  }


  bookings:any;
  imageSource1:any;
  check:boolean = false;
  houses:any;
  fetchAllBookedByCustomerID(custID:any){
    this.check =true;
    this.houseBookingService.getBookingByCustomerID(custID).subscribe((resp:any)=>{
      this.bookings = resp;
      this.check = false;

      this.paymentService.getBookingByID(resp[0].house_booking_id).subscribe((resp2:any)=>{
        console.log(resp2);
        this.houses = resp2;

        
      })
      
    })
  }

  fetchByBooking(){

  }

   displayImage(url:any){
    return 'data:image/png;base64,' + url
  }

  onLogOut(){
    
  }

  Selectfile1: File = null!;
  onImageUpload1(event:any) {
    this.Selectfile1 = event.target.files[0];
  }

  configureForm(){
    this.paymentForm = new FormGroup({

    })
  }

  onSubmit(){
    const customerId = this.route.snapshot.queryParamMap.get('id')
    this.houseBookingService.getBookingByCustomerID(customerId).subscribe((resp:any)=>{
      const bookingID = resp[0].house_booking_id
      const form1 = new FormData();
      form1.append('imageFile', this.Selectfile1, this.Selectfile1.name);
      this.paymentService.addPayment(customerId,bookingID,form1).subscribe((resp:any)=>{
        this.reload();
        this.alert()
      })

        
    })
 
    
  }

  reload(){
    this.router.navigateByUrl('',{skipLocationChange:true}).then(()=>{
      this.router.navigate(['house-listing'])
    })
  }

  alert(){
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Sent successfully"
    });
  }

}
