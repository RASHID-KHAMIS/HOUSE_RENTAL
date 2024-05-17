import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit{

  loginForm!:FormGroup;
  constructor(private router:Router,
    private route:ActivatedRoute
  ){}
  ngOnInit(): void {
    this.configureLogin();
   
  }

  configureLogin(){
    this.loginForm = new FormGroup({
      username:new FormControl(null, Validators.required),
      password:new FormControl(null, Validators.required),
    })
  }

  onLogin(){
    const values = this.loginForm.value;
    // console.log(values);
    this.router.navigateByUrl('/admin').then(()=>{
      location.reload();
    })

  }

}
