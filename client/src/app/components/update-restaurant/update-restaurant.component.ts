import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Restaurant } from '../../models/restaurant';
import { RestaurantService } from '../../services/restaurant.service';
import { RestaurantsComponent } from '../restaurants/restaurants.component';

@Component({
  selector: 'app-update-restaurant',
  templateUrl: './update-restaurant.component.html',
  styleUrls: ['./update-restaurant.component.css'],
  providers: [RestaurantService]
})
export class UpdateRestaurantComponent implements OnInit {

  restaurants: Restaurant[] = [];
  restaurant: Restaurant;
  restaurantId: any;
  restaurant_name: string;
  phone: string;
  address: string;
  userHasTypedInPhone: boolean = false;
  userHasTypedInAddress: boolean = false;
  userHasTypedInName: boolean = false;
  requireModel: boolean = false;
  errorMsg: string;

  constructor(private router: Router, private activatedRouter: ActivatedRoute, private restaurantService: RestaurantService) { }

  updateRestaurant(){
    if(this.userHasTypedInPhone == true){
      this.phone = this.phone;
    }
    else{
      this.phone = this.restaurants[0].phone;
    }

    if(this.userHasTypedInAddress == true){
      this.address = this.address;
    }
    else{
      this.address = this.restaurants[0].address;
    }

    if(this.userHasTypedInName == true){
      if(this.restaurant_name == null || this.restaurant_name == ''){
        this.requireModel = true;
      }
      this.restaurant_name = this.restaurant_name;
    }
    else{
      this.restaurant_name = this.restaurants[0].restaurant_name;
    }

    const updateRestaurant = {
      restaurant_name: this.restaurant_name,
      phone: this.phone,
      address: this.address
    }

    console.log(this.restaurant_name);

    this.restaurantService.updateRestaurant(updateRestaurant, this.restaurantId).subscribe(
      data => { 
        if(updateRestaurant.restaurant_name != null && updateRestaurant.restaurant_name != '' && this.restaurants.push(updateRestaurant)){
          console.log('Restaurant is updated.');
          this.goBackToHome();
        } 
        else
        {
          console.log('Restaurant not updated.')
        }
        },
        error => {
          this.errorMsg = error.message;
        });
  }

  ngOnInit(){
    this.activatedRouter.params.subscribe( params => this.restaurantId = params.id);
    console.log(this.restaurantId);
    this.restaurantService.getRestaurant(this.restaurantId).subscribe(data => this.restaurants = data);
  }

  public userTypedInPhone(event: any){
    this.userHasTypedInPhone = true;
  }

  public userTypedInAddress(event: any){
    this.userHasTypedInAddress = true;
  }

  public userTypedInName(event: any){
    this.userHasTypedInName = true;
  }

  public goBackToHome(){
    this.router.navigate(['restaurants']);
  }
}
