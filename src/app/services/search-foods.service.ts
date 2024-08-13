import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchFoodsService {

  constructor(
    private http: HttpClient
  ) { }


  fetchMealTypes(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:5000/mealtypes').pipe(map((response:any) => response));
  }

  searchFoods(query: any): Observable<any> {
    let body = {
      data: query
    }
    return this.http.post<any>('http://127.0.0.1:5000/fineli/search', body).pipe(map((response: any) => response));
  }


  fetchFoodWithId(food_id: number): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:5000/fineli/food/' + food_id).pipe(map((response: any) => response));
  }
}
