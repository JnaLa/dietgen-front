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

  searchFoods(query: any): Observable<any> {
    console.log(query)
    let body = {
      data: query
    }
    return this.http.post<any>('http://127.0.0.1:5000/fineli/testi', body).pipe(map((response: any) => response));
  }

}
