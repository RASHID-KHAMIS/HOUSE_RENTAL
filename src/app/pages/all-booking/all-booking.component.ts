import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { HouseBookingService } from 'src/app/services/house-booking.service';

@Component({
  selector: 'app-all-booking',
  templateUrl: './all-booking.component.html',
  styleUrls: ['./all-booking.component.css']
})
export class AllBookingComponent implements OnInit{
  displayedColumns: string[] = ['id','Name', 'phoneNumber', 'title','address','startDate',
  'endDate','totalPrice','bookingStatus','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(private router:Router,
    private route:ActivatedRoute,
    private houseBookingService:HouseBookingService){}
  ngOnInit(): void {
  
    this.fetchAllBooking()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  fetchAllBooking(){
    this.houseBookingService.getAllBooking().subscribe((resp:any)=>{
      console.log(resp);
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
    })
  }

  onView(row:any){
    this.router.navigate(['admin/view-booking'],{queryParams:{id:row.house_booking_id}})
  }

}
