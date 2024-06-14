import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-payment',
  templateUrl: './view-payment.component.html',
  styleUrls: ['./view-payment.component.css']
})
export class ViewPaymentComponent implements OnInit{

  viewPaymentForm!:FormGroup;
  constructor(private router:Router,
    private route:ActivatedRoute,
    private paymentService:PaymentService,
    private sanitizer:DomSanitizer){}
  ngOnInit(): void {
    const payment =this.route.snapshot.queryParamMap.get('id');
    this.fetchPaymentById(payment);
    this.configureForm();
    
  }

  payments:any;
  imageSource1:any;
  statuses:any;
  
  
  fetchPaymentById(id:any){
    this.paymentService.getByPaymentID(id).subscribe((resp:any)=>{
      this.payments = resp;
 
      this.imageSource1 = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${resp.receiptImage}`);

      this.viewPaymentForm = new FormGroup({
        payment_id: new FormControl(resp.payment_id),
        houseBooking: new FormControl(resp.houseBooking),
        controllNumber: new FormControl(resp.controllNumber),
        startDate: new FormControl(resp.houseBooking.startDate),
        endDate: new FormControl(resp.houseBooking.endDate),
        totalPrice: new FormControl(resp.houseBooking.totalPrice),
        bookingDescription: new FormControl(resp.houseBooking.bookingDescription),
        customer_data: new FormControl(resp.customer_data),
    
        houseTitle: new FormControl(resp.houseBooking.house.title),
        houseType: new FormControl(resp.houseBooking.house.type),
        houseSize: new FormControl(resp.houseBooking.house.size),
        houseBedrooms: new FormControl(resp.houseBooking.house.bedrooms),
        houseBathrooms: new FormControl(resp.houseBooking.house.bathrooms),
        houseAddress: new FormControl(resp.houseBooking.house.address),
        otherDetails: new FormControl(resp.houseBooking.house.otherDetails),
    
        customerFName: new FormControl(resp.houseBooking.customer.firstName),
        customerLName: new FormControl(resp.houseBooking.customer.lastName),
        customerEmail: new FormControl(resp.houseBooking.customer.email),
        customerPhoneNumber: new FormControl(resp.houseBooking.customer.phoneNumber),
        customerAddress: new FormControl(resp.houseBooking.customer.address),
        customerNationalIdNumber: new FormControl(resp.houseBooking.customer.nationalIdNumber),
        payment_status: new FormControl(1),
      })
    })
  }

configureForm(){
  this.viewPaymentForm = new FormGroup({
    payment_id: new FormControl(null),
    houseBooking: new FormControl(null),
    controllNumber: new FormControl(null),
    startDate: new FormControl(null),
    endDate: new FormControl(null),
    totalPrice: new FormControl(null),
    bookingDescription: new FormControl(null),
    customer_data: new FormControl(null),

    houseTitle: new FormControl(null),
    houseType: new FormControl(null),
    houseSize: new FormControl(null),
    houseBedrooms: new FormControl(null),
    houseBathrooms: new FormControl(null),
    houseAddress: new FormControl(null),
    otherDetails: new FormControl(null),

    customerFName: new FormControl(null),
    customerLName: new FormControl(null),
    customerEmail: new FormControl(null),
    customerPhoneNumber: new FormControl(null),
    customerAddress: new FormControl(null),
    customerNationalIdNumber: new FormControl(null),
    payment_status: new FormControl(null),
  })
}

  onBack(){
    this.router.navigateByUrl('admin/payments')
  }

  onSave(){
    const id = this.viewPaymentForm.get('payment_id')?.value;
      this.paymentService.editPayment(id).subscribe((resp:any)=>{
      this.reload();
      this.alert()

    })
  }

  reload() {
    this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/admin/payments'])
    })
  }

  alert() {
    Swal.fire({
      title: "Payment Confirmed successfully",
      text: "You clicked the button!",
      icon: "success"
    });
  }

}
