import { Routes } from '@angular/router';
import { DietDiaryComponent } from './diet-diary/diet-diary.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { RegisterComponent } from './register-login/register/register.component';
import { LoginComponent } from './register-login/login/login.component';

export const routes: Routes = [
    { path: "profile", component: ProfilesComponent },
    { path: "diary", component: DietDiaryComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
];
