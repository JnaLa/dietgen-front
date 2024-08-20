import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterLoginService } from '../../services/register-login.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  
  constructor(
    private router: Router,
    private registerService: RegisterLoginService
  ) {}

  registerForm = new FormGroup({
    email: new FormControl(),
    username: new FormControl(),
    password: new FormControl(),
  })

  registerUser() {
    let newAccount = this.registerForm.getRawValue();
    
    this.registerService.createAccount(newAccount).subscribe(r => {
      this.router.navigate(['/login'])
      console.log(r)
    })


  }

}
