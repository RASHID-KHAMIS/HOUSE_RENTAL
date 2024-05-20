import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HouseLocationService } from 'src/app/services/house-location.service';

@Component({
  selector: 'app-view-house',
  templateUrl: './view-house.component.html',
  styleUrls: ['./view-house.component.css']
})
export class ViewHouseComponent implements OnInit{

  constructor(private router:Router,
    private route:ActivatedRoute,
    private houseLocationService:HouseLocationService){}
  ngOnInit(): void {
    const house =this.route.snapshot.queryParamMap.get('id')
    console.log(house);
    this.fetchByLocationID(house)
    
  }


  houses:any
  fetchByLocationID(house:any){
    this.houseLocationService.getHouseInfoByLocationID(house).subscribe((resp:any)=>{
      console.log(resp);
      this.houses = resp;
    })
  }

}
