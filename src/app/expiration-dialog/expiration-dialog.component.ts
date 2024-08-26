import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RegisterLoginService } from '../services/register-login.service';

@Component({
  selector: 'app-expiration-dialog',
  standalone: true,
  imports: [],
  templateUrl: './expiration-dialog.component.html',
  styleUrl: './expiration-dialog.component.css'
})
export class ExpirationDialogComponent {
  message: string = "";
  timer: any;
  remainingTime: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ExpirationDialogComponent>,
    private authService: RegisterLoginService
  ) {
    dialogRef.disableClose = true;
    if (data) {
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.data.confirmButtonText = data.buttonText.ok || this.data.confirmButtonText;
        this.data.cancelButtonText = data.buttonText.cancel || this.data.cancelButtonText;
      }
    }
  }

  ngOnInit(): void {
    let remainingTime = 60;
    this.remainingTime = remainingTime;
    this.timer = setInterval(() => {
      if (remainingTime === 0) {
        clearInterval(this.timer);
        this.authService.logOut()
      }
    }, 1000);
  }

  onYesClick(): void {
    clearInterval(this.timer);
    this.dialogRef.close("Yes");
  }

  onNoClick(): void {
    clearInterval(this.timer);
    this.dialogRef.close("No");
  }






}
