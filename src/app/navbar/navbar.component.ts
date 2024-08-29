import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegisterLoginService } from '../services/register-login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
  RouterModule,
  CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(
    public logoutService: RegisterLoginService
  ) 
  {
    
  }

}
