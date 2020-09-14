import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantService } from '../../services/restaurant.service';
import { Restaurant } from '../../models/restaurant';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  restaurants: Restaurant[] = [];
  restaurant: Restaurant; 
  restaurant_name: string;
  phone: string;
  address: string;
  enteredValue: string;

  constructor(private router: Router, private restaurantService: RestaurantService) { }

  deleteRestaurant(id:any){
    console.log(id);
    var restaurants = this.restaurants;
    this.restaurantService.deleteRestaurant(id).subscribe(data => {
      for(var i = 0; i < restaurants.length; i++){
        if(restaurants[i]._id == id){
          restaurants.splice(i, 1);
        }
      }
    });
  }

  public get sortedName(){
    return this.restaurants.sort((a,b)=> a.restaurant_name.localeCompare(b.restaurant_name));
  }

  updateRestaurant(id:any){
    this.router.navigate(['update/'+id]);
  }

  ngOnInit(){
    this.restaurantService.getRestaurants().subscribe(data => this.restaurants = data);
  }

  public addRestaurant(){
    this.router.navigate(['add']);
  }

  public search(name: string){
    if(name != ""){
      this.restaurants = this.restaurants.filter(
        res=>{
          return res.restaurant_name.toLocaleLowerCase().match(name);
        }
      )
    }
    else if(name == ""){
      this.ngOnInit();
    }
    
  }

}
