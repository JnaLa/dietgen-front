import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class RegisterLoginService {

  constructor(
    private http: HttpClient
  ) { }

  createAccount(newAccount: any): Observable<any> {
    return this.http.post<any>("http://127.0.0.1:5000/users/create", newAccount).pipe(map((response: any) => response));
  }

  logIn(credentials: any): Observable<any> {
    return this.http.post<any>("http://127.0.0.1:5000/users/login", credentials).pipe(map((response: any) => response));
  }
  
  public setSession(authResult: any) {
    const expiresAt = moment().add(authResult.expiresIn, "second");


    localStorage.setItem("id_token", authResult.access_token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem("is_admin", authResult.is_admin);

  }


}
