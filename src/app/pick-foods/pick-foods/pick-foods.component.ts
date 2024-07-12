import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable, of } from 'rxjs';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-pick-foods',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatInputModule
    
  ],
  templateUrl: './pick-foods.component.html',
  styleUrl: './pick-foods.component.css'
})


export class PickFoodsComponent {


  foodsForm = new FormGroup({
    food_id: new FormControl(3),
    food_name: new FormControl('leipä'),
    food_amount: new FormControl()
  })

  filteredFoods!: Observable<any[]>;

  

  constructor(
    private http: HttpClient,
  ) {}

  

  
  ngOnInit() {
    this.filteredFoods
  }







  fetchMatchingFoods() {

  }







  testi() {
    let name = "chorizo"
    let id = 3
    let parametrit = {
      name: name,
      id: id
    }


    this.http.post<any>('http://127.0.0.1:5000/search', parametrit).subscribe(r => {
      console.log(r)
    })
  }

}
