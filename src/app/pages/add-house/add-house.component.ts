import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddHouseService } from 'src/app/services/add-house.service';
import { PriceInformationService } from 'src/app/services/price-information.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-house',
  templateUrl: './add-house.component.html',
  styleUrls: ['./add-house.component.css']
})
export class AddHouseComponent implements OnInit{

  houseForm!:FormGroup;
  rentingForm!:FormGroup;
  constructor(private router:Router,
    private route:ActivatedRoute,
    private addHouseService:AddHouseService,
    private priceInformationService:PriceInformationService
  ){}
  ngOnInit(): void {
   this.configureForm()
  }

  configureForm(){
    this.houseForm = new FormGroup({
      title: new FormControl(null,Validators.required),
      description: new FormControl(null),
      type: new FormControl(null,Validators.required),
      size: new FormControl(null),
      bedrooms: new FormControl(null),
      bathrooms: new FormControl(null),
      address: new FormControl(null,Validators.required),
      latitude: new FormControl(null),
      longitude: new FormControl(null),
      status: new FormControl(1),
      color: new FormControl(null),
      otherDetails: new FormControl(null),
      renting_price : new FormControl(null,Validators.required)
    });
  
  }

  onSave(){
    const values = this.houseForm.value;
    // console.log(values);
    this.addHouseService.addHouse(values).subscribe((resp:any)=>{
 
      const price = {
        "house": resp,
        "renting_price": this.houseForm.get("renting_price")?.value
      }

      this.priceInformationService.addPriceInfo(price).subscribe((resp:any)=>{
        this.alert();
      })


    })
    
  }

  reload(){
    this.router.navigateByUrl('',{skipLocationChange:true}).then(()=>{
      this.router.navigate(['admin/role'])
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
      title: "House Added successfully"
    });
  }


}
