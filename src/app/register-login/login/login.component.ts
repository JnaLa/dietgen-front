import { Component } from '@angular/core';
import { RegisterLoginService } from '../../services/register-login.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    private router: Router,
    private loginService: RegisterLoginService
  ) {}

  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  })

  jwtToken: any
  showError: boolean = false;

  registerUser() {
    let credentials = this.loginForm.getRawValue();
    
    this.loginService.logIn(credentials).subscribe( {
      
      next: (v) => this.loginService.setSession(v),
      error: (e) => this.showError = true,
      complete: () => this.router.navigate(['/profile'])
    })
  }

}
