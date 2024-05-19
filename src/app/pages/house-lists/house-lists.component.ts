import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { HouseLocationService } from 'src/app/services/house-location.service';

@Component({
  selector: 'app-house-lists',
  templateUrl: './house-lists.component.html',
  styleUrls: ['./house-lists.component.css']
})
export class HouseListsComponent implements OnInit{
  displayedColumns: string[] = ['id','tittle', 'type', 'size','address','region','status', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(private router:Router,
    private route:ActivatedRoute,
    private houseLocationService:HouseLocationService,
    private dialog:MatDialog){}
  ngOnInit(): void {
    this.fetcAllHouseLocation();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fetcAllHouseLocation(){
    this.houseLocationService.getAllHouseLocation().subscribe((resp:any)=>{
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort =this.sort;
      
    })
  }

  onOpen() {
   this.router.navigateByUrl('admin/view-house')
  }


}
