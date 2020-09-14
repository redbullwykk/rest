import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Restaurant } from '../models/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http: HttpClient) { }

  //Retrieving restaurants
  getRestaurants(): Observable<Restaurant[]>{
    return this.http.get<Restaurant[]>('api/restaurants');
  }

  getRestaurant(id): Observable<Restaurant[]>{
    console.log(id);
    console.log('getRestaurant was executed');
    return this.http.get<Restaurant[]>('api/restaurant-info/'+id);
  }

  //Adding new restaurant
  addRestaurant(newRestaurant){
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('api/restaurant', newRestaurant, {headers: headers});
  }

  updateRestaurant(updateRestaurant, id){
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.put('api/restaurant/update/'+id, updateRestaurant, {headers: headers});
  }
  //Deleting restaurant
  deleteRestaurant(id){
    return this.http.delete('api/restaurant/'+id);
  }

}
