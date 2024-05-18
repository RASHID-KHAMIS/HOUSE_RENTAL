import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-house',
  templateUrl: './add-house.component.html',
  styleUrls: ['./add-house.component.css']
})
export class AddHouseComponent implements OnInit{

  houseForm!:FormGroup;
  constructor(private router:Router,
    private route:ActivatedRoute
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
      otherDetails: new FormControl(null)
    })
  }

  onSave(){
    const values = this.houseForm.value;
    console.log(values);
    
  }

}
