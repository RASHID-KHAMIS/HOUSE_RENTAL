import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  loginForm!: FormGroup;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService
  ) { }
  ngOnInit(): void {
    this.configureLogin();

  }

  configureLogin() {
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    })
  }

  onLogin() {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    this.loginService.getLogin(username, password).subscribe((resp: any) => {
      // console.log(resp.length);

    
        console.log('cccc');

        sessionStorage.setItem('user_id', resp.user_id);
        sessionStorage.setItem('username', resp.username);
        sessionStorage.setItem('role', resp.userType);

        switch (resp.userType) {
          case 'ADMINISTRATOR':
          this.router.navigateByUrl('/admin').then(()=>{
            location.reload();
          })
          break;

          case 'CUSTOMER':
            this.router.navigateByUrl('/admin').then(()=>{
              location.reload();
            })
            break
            default:
              this.router.navigateByUrl("") 
        }
    },
    (error:HttpErrorResponse)=>{   Swal.fire({
      title: "Error!",
      text: "Incorrect username or password.",
      icon: "error"
    });
    })


  }

}
