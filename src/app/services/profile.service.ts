import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) 
  {  }

  addProfileData(profileData: any): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:5000/profiles/create', profileData).pipe(map((response: any) => response));
  }

  returnUserProfile(user_public_id: any): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:5000/user/profile/get/' + user_public_id).pipe(map((response: any) => response));
  }
}
