import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddHouseService } from 'src/app/services/add-house.service';
import { HouseLocationService } from 'src/app/services/house-location.service';
import { PriceInformationService } from 'src/app/services/price-information.service';
import Swal from 'sweetalert2';

interface Y {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-house',
  templateUrl: './add-house.component.html',
  styleUrls: ['./add-house.component.css']
})
export class AddHouseComponent implements OnInit{

  houseForm!:FormGroup;
  rentingForm!:FormGroup;

  regions: Y[] = [
    {value: 'MJINI MAGHARIBI', viewValue: 'MJINI MAGHARIBI'},
    {value: 'KASKAZINI UNGUJA', viewValue: 'KASKAZINI UNGUJA'},
    {value: 'KUSINI UNGUJA', viewValue: 'KUSINI UNGUJA'},
  ];

  districts: Y[] = [
    {value: 'MJINI', viewValue: 'MJINI'},
    {value: 'MAGHARIBI A', viewValue: 'MAGHARIBI A'},
    {value: 'MAGHARIBI B', viewValue: 'MAGHARIBI B'},
  ];
  
  constructor(private router:Router,
    private route:ActivatedRoute,
    private addHouseService:AddHouseService,
    private priceInformationService:PriceInformationService,
    private houseLocationService:HouseLocationService
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
      region: new FormControl(null),
      district: new FormControl(null),
      renting_price : new FormControl(null,Validators.required)
    });
  
  }

  onSave(){
    const values = this.houseForm.value;
    this.addHouseService.addHouse(values).subscribe((resp:any)=>{
      const price = {
        "house": resp,
        "renting_price": this.houseForm.get("renting_price")?.value
      }

      this.priceInformationService.addPriceInfo(price).subscribe((resp:any)=>{});
      
      let region = this.houseForm.get("region")?.value;
      let district = this.houseForm.get("district")?.value;
      let other = this.houseForm.get("otherDetails")?.value;

      const form1 = new FormData();
      form1.append('imageFile', this.Selectfile1, this.Selectfile1.name);
      this.houseLocationService.addHouseLocation(region,district,other,resp.house_id,form1).subscribe((output:any)=>{
        this.alert();
      });
    })
    
  }

  Selectfile1: File = null!;
  onImageUpload1(event:any) {
    this.Selectfile1 = event.target.files[0];
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
