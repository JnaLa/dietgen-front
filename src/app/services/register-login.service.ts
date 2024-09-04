import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import moment from "moment";
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ExpirationDialogComponent } from '../expiration-dialog/expiration-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class RegisterLoginService {

  constructor(
    private http: HttpClient,
    private router: Router,
    public dialog: MatDialog
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
    localStorage.setItem("user_public_id", authResult.user_public_id);

    this.startExpirationTimer();
  }

  logOut() {
    localStorage.clear();
    this.dialog.closeAll();
    // this.router.navigate(["/login"]);
  }

  getExpiration() {
    const expiresAt = JSON.parse(localStorage.getItem("expires_at")!);
    return moment(expiresAt);
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  startExpirationTimer() {
    const expiresAt = this.getExpiration();
    const timeUntilExpiration = expiresAt.valueOf() - moment().valueOf();

    setTimeout(() => {
      this.openExpirationDialog();
    }, timeUntilExpiration);
  }

  openExpirationDialog() {
    const dialogRef = this.dialog.open(ExpirationDialogComponent, {
      data: {
        message: "Extend login?",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        header: "Your login is expiring in",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === "Yes") {
        localStorage.setItem("expires_at",
          JSON.stringify(moment().add(30, "minutes").valueOf())
        );
        this.startExpirationTimer();
    } 
      else if (result === "No") {
        this.logOut();
      }
    });
  }
}
