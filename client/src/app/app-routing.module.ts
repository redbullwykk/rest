import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';
import { AddRestaurantComponent } from './components/add-restaurant/add-restaurant.component';
import { UpdateRestaurantComponent } from './components/update-restaurant/update-restaurant.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "restaurants", component:RestaurantsComponent},
  {path: "add", component:AddRestaurantComponent},
  {path: "update/:id", component: UpdateRestaurantComponent},
  //{path: "**", component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
