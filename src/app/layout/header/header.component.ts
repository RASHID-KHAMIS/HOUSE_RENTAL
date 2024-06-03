import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { LoginService } from 'src/app/services/login.service';
import { RoleService } from 'src/app/services/role.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loginForm!: FormGroup;
  signUpForm!: FormGroup;
  role:any;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private roleService:RoleService,
    private customerService:CustomerService) { }
  ngOnInit(): void {
    this.configureLogin();
    this.configureSigUp();

    this.role = sessionStorage.getItem("role");
  }

  configureLogin() {
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    })
  }

  configureSigUp() {
    this.signUpForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, Validators.required),
      address: new FormControl(null,[Validators.email,Validators.required]),
      nationalIdNumber: new FormControl(null, Validators.required),
      user_id: new FormControl(null),
    })
  }

  onLogin() {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    this.loginService.getLogin(username, password).subscribe((resp: any) => {
      sessionStorage.setItem('user_id', resp.user_id);
      sessionStorage.setItem('username', resp.username);
      sessionStorage.setItem('role', resp.userType);
 
      

      switch (resp.userType) {
        case 'ADMINISTRATOR':
          this.router.navigateByUrl('/admin').then(() => {
            location.reload();
          })
          break;

        case 'CUSTOMER':
          this.router.navigateByUrl('').then(() => {
            location.reload();
          })
     
          break
        default:
          this.router.navigateByUrl("")
      }
    },
      (error: HttpErrorResponse) => {
        Swal.fire({
          title: "Error!",
          text: "Incorrect username or password.",
          icon: "error"
        });
      })

  }

  onSinUp(){
    this.roleService.getRoleByName("CUSTOMER").subscribe((resp:any)=>{
      const customer = {
        username: this.signUpForm.value.email,
        password: this.signUpForm.value.email,
        userStatus: '1',
        userType: resp.roleName
      }
      this.loginService.registerUser(customer).subscribe((resp:any)=>{
        this.signUpForm.patchValue({user_id:resp});
            const values = this.signUpForm.value;
            this.customerService.addCustomer(values).subscribe((resp:any)=>{
              this.reload();
              this.alert();
            })
        
      })
 
    })
  }

  onLogOut(){
    sessionStorage.clear();
    this.router.navigateByUrl("").then(()=>{
      location.reload();
    })
    // console.log(333);
    
  }

  onSelectChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    if (selectedValue === 'logout') {
      this.onLogOut();
    } else {
      // Handle other options if needed
      console.log('Selected:', selectedValue);
    }
    
  }

  reload() {
    this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/'])
    })
  }

  alert() {
    Swal.fire({
      title: "Customer  added successfully",
      text: "You clicked the button!",
      icon: "success"
    });
  }

}
