import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { catchError, debounceTime, distinctUntilChanged, Observable, of, switchMap } from 'rxjs';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { SearchFoodsService } from '../../services/search-foods.service';

@Component({
  selector: 'app-pick-foods',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatInputModule
    
  ],
  templateUrl: './pick-foods.component.html',
  styleUrl: './pick-foods.component.css'
})


export class PickFoodsComponent {


  foodsForm = new FormGroup({
    food_id: new FormControl(),
    food_name: new FormControl(),
    food_amount: new FormControl()
  })

  filteredFoods!: Observable<any[]>;

  

  constructor(
    private searchFoodsService: SearchFoodsService
  ) {}

  

  
  ngOnInit(): void {
    this.filteredFoods = this.foodsForm.get('food_name')!.valueChanges.pipe(
      debounceTime(300), // Wait 300ms after the last keystroke before making a request
      distinctUntilChanged(), // Only make a request if the value changed
      switchMap(value => {
        if (value) {
          return this.searchFoodsService.searchFoods(value).pipe(
            catchError(error => {
              console.error(error);
              return of([]); // Return an empty array on error
            }),
            switchMap(response => {
              let foodsArray = [];
              for (let key in response) {
                if (response.hasOwnProperty(key)) {
                  foodsArray.push({ key: key, value: response[key] });
                }
              }
              return of(foodsArray);
            })
          );
        } else {
          return of([]); // Return an empty array if the input is empty
        }
      })
    );
  }

  fetchMatchingFoods() {

  }
















testi() {

}


}
