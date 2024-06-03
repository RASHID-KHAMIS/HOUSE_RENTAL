import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HouseLocationService } from 'src/app/services/house-location.service';
import { LoginService } from 'src/app/services/login.service';
import { PriceService } from 'src/app/services/price.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

 
  constructor(private router: Router,
    private route: ActivatedRoute,
    private houseLocationService:HouseLocationService,
    private priceService:PriceService
  ) { }

  username:any;
  ngOnInit(): void {
   this.fetchHouseByLimits();
   this.fetchAllPrice();

   this.username = sessionStorage.getItem("username");

  }

  houses:any;
  fetchHouseByLimits(){
    this.houseLocationService.getHouseLocationWithLimit(8).subscribe((resp:any)=>{
      this.houses = resp;
      
    })
  }


  displayImage(url:any){
    return 'data:image/png;base64,' + url
  }

  prices:any;
  fetchAllPrice(){
    this.priceService.getAllPrice().subscribe((resp:any)=>{
      this.prices = resp;
    })
  }

 

}
