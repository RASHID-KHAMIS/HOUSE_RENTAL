import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './layout/index/index.component';
import { AboutUsComponent } from './layout/about-us/about-us.component';
import { HouseListingComponent } from './layout/house-listing/house-listing.component';
import { ContactUsComponent } from './layout/contact-us/contact-us.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RoleComponent } from './pages/role/role.component';
import { AdminDashboardComponent } from './layout/admin-dashboard/admin-dashboard.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { CardComponent } from './layout/card/card.component';
import {MatCardModule} from '@angular/material/card';
import { AddHouseComponent } from './pages/add-house/add-house.component';
import { HouseListsComponent } from './pages/house-lists/house-lists.component';
import { ViewHouseComponent } from './pages/view-house/view-house.component';
import { HeaderComponent } from './layout/header/header.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { HouseDetailsComponent } from './layout/house-details/house-details.component';
import { FooterComponent } from './layout/footer/footer.component';
import { BookingComponent } from './pages/booking/booking.component';
import { StaffComponent } from './pages/staff/staff.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { PaymentsComponent } from './pages/payments/payments.component';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    AboutUsComponent,
    HouseListingComponent,
    ContactUsComponent,
    DashboardComponent,
    RoleComponent,
    AdminDashboardComponent,
    NavbarComponent,
    SidebarComponent,
    CardComponent,
    AddHouseComponent,
    HouseListsComponent,
    ViewHouseComponent,
    HeaderComponent,
    CustomerComponent,
    HouseDetailsComponent,
    FooterComponent,
    BookingComponent,
    StaffComponent,
    UserManagementComponent,
    PaymentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    MatCardModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
