import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { RoleService } from 'src/app/services/role.service';
import { StaffService } from 'src/app/services/staff.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  @ViewChild('distributionDialog') distributionDialog!: TemplateRef<any>;
  @ViewChild('distributionDialog2') distributionDialog2!: TemplateRef<any>;
  displayedColumns: string[] = ['id', 'name', 'position','email','phoneNumber','address','dateOfBirth', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  staffForm!: FormGroup;
  staffEditForm!:FormGroup;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private staffService: StaffService,
    private dialog: MatDialog,
    private roleService:RoleService,
    private loginService:LoginService) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.fetchAllStaff();
    this.configureForm();
    this.fetchRole()
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fetchAllStaff() {
    this.staffService.getAllStaff().subscribe((resp: any) => {
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  roles:any;
  fetchRole(){
    this.roleService.getAllRoles().subscribe((resp:any)=>{
     this.roles = resp;
    })
  }

  configureForm() {
    this.staffForm = new FormGroup({
      staffName: new FormControl(null, Validators.required),
      position: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      dateOfBirth: new FormControl(null, Validators.required),
      roleName: new FormControl(null),
      users: new FormControl(null),
    })
  }

  configureEditForm(){
    this.staffEditForm = new FormGroup({
      staffId: new FormControl(null),
      staffName: new FormControl(null, Validators.required),
      position: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      dateOfBirth: new FormControl(null, Validators.required),
      roleName: new FormControl(null),
      users: new FormControl(null),
    })
  }

  openDialog() {
    let dialogRef = this.dialog.open(this.distributionDialog, {
      width: '550px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (result !== 'no') {
          const enabled = "Y"

        } else if (result === 'no') {
        }
      }
    })
  }

  openDialog2(row: any) {
    this.staffEditForm = new FormGroup({
      staffId: new FormControl(row.staffId),
      staffName: new FormControl(row.staffName),
      position: new FormControl(row.position),
      email: new FormControl(row.email),
      phoneNumber: new FormControl(row.phoneNumber),
      address: new FormControl(row.address),
      dateOfBirth: new FormControl(row.dateOfBirth),
      roleName: new FormControl(row.roleId),
      users: new FormControl(row.users),
    })
    let dialogRef = this.dialog.open(this.distributionDialog2, {
      width: '750px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (result !== 'no') {
          const enabled = "Y"

        } else if (result === 'no') {
        }
      }
    })
  }

  onSave() {
    const staff = {
      username:this.staffForm.value.email,
      password:this.staffForm.value.email,
      userStatus:'1',
      userType:this.staffForm.value.roleName
    }
    this.loginService.registerUser(staff).subscribe((resp:any)=>{
      this.staffForm.patchValue({users:resp});
      const values = this.staffForm.value;
      this.staffService.addStaff(values).subscribe((response:any)=>{
        this.reload();
        this.alert()
      })
    })
    
  }

  onEdit() {

  }

  reload() {
    this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/admin/staff'])
    })
  }

  alert() {
    Swal.fire({
      title: "Staff  added successfully",
      text: "You clicked the button!",
      icon: "success"
    });
  }


}
