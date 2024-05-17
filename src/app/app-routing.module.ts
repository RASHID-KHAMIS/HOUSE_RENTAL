import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './layout/index/index.component';
import { AboutUsComponent } from './layout/about-us/about-us.component';
import { HouseListingComponent } from './layout/house-listing/house-listing.component';
import { ContactUsComponent } from './layout/contact-us/contact-us.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

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
  component:DashboardComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
