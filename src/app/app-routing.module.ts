import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './layout/index/index.component';
import { AboutUsComponent } from './layout/about-us/about-us.component';
import { HouseListingComponent } from './layout/house-listing/house-listing.component';
import { ContactUsComponent } from './layout/contact-us/contact-us.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminDashboardComponent } from './layout/admin-dashboard/admin-dashboard.component';
import { RoleComponent } from './pages/role/role.component';
import { AddHouseComponent } from './pages/add-house/add-house.component';

const routes: Routes = [
{
  path:'',
  component:IndexComponent
},
{
  path:'about-us',
  component:AboutUsComponent
},
{
  path:'house-listing',
  component:HouseListingComponent
},
{
  path:'contact-us',
  component:ContactUsComponent
},
{
  path:'admin',
  component:AdminDashboardComponent,
  children:[
    {
      path:'',
      component:DashboardComponent
    },
    {
      path:'role',
      component:RoleComponent
    },
    {
      path:'add-house',
      component:AddHouseComponent
    },
]
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
