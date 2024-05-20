import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-house',
  templateUrl: './view-house.component.html',
  styleUrls: ['./view-house.component.css']
})
export class ViewHouseComponent implements OnInit{

  constructor(private router:Router,
    private route:ActivatedRoute){}
  ngOnInit(): void {
    const house =this.route.snapshot.queryParamMap.get('id')
    console.log(house);
    
  }

}
