import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{


  role:any;
  constructor(private router:Router,
    private route:ActivatedRoute){}
  ngOnInit(): void {
   this.role =  sessionStorage.getItem('role');
   console.log(this.role);
   
  }

}
