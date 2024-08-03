import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{


  role:any;
  constructor(private router:Router,
    private route:ActivatedRoute){}
  ngOnInit(): void {
    this.role = sessionStorage.getItem("role");

    
   this.changeLog()
  }

  changeLog(){
    let localData = sessionStorage.getItem("role");
    if(localData == null){
      this.router.navigateByUrl("/")
    }
  }

  onLogOut(){
    sessionStorage.clear();
    this.router.navigateByUrl("/")
  }

}
