import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterLoginService {

  constructor(
    private http: HttpClient
  ) { }

  createAccount(newAccount: any): Observable<any> {
    return this.http.post<any>("http://127.0.0.1:5000/user/create", newAccount).pipe(map((response: any) => response));
  }
}
