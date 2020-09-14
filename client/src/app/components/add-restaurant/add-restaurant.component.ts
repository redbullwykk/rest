import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from '../../models/restaurant';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css'],
  providers: [RestaurantService]
})
export class AddRestaurantComponent implements OnInit {

  restaurants: Restaurant[] = [];
  restaurant: Restaurant;
  restaurant_name: string;
  phone: string;
  address: string;
  errorMsg: string;

  constructor(private router: Router, private restaurantService: RestaurantService) { }

  addRestaurant(){
    const newRestaurant = {
      restaurant_name: this.restaurant_name,
      phone: this.phone,
      address: this.address
    }

    this.restaurantService.addRestaurant(newRestaurant).subscribe( 
      data => { 
      if(newRestaurant.restaurant_name != null && newRestaurant.restaurant_name != '' && this.restaurants.push(newRestaurant)){
        console.log('Restaurant is added.');
        this.goBackToHome();
      } 
      else
      {
        console.log('Restaurant not added.')
      }
      },
      error => {
        this.errorMsg = error.message;
      });
  }

  ngOnInit() {
  }

  public goBackToHome(){
    this.router.navigate(['restaurants']);
  }

}
