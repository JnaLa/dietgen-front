import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { catchError, debounceTime, distinctUntilChanged, Observable, of, switchMap } from 'rxjs';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { SearchFoodsService } from '../services/search-foods.service';
import { FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';


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
    MatInputModule,
    FontAwesomeModule
    
  ],
  templateUrl: './pick-foods.component.html',
  styleUrl: './pick-foods.component.css'
})


export class PickFoodsComponent {

  faXmark = faXmark

  foodsForm = new FormGroup({
    // Foods 
    food_id: new FormControl(),
    food_name: new FormControl(),
    food_amount: new FormControl(),

    // Meals
    meal_type: new FormControl(),
    test: new FormControl()

  })

  filteredFoods!: Observable<any[]>;
  foodsArray: any = [] // All matching foods
  dietFoodList: any = []  // Displayed on table


  meal_types: any = [
    {"id": 0, "name": "Breakfast"},
    {"id": 1, "name": "Brunch"},
    {"id": 2, "name": "Lunch"},
    {"id": 3, "name": "Snack"},
    {"id": 4, "name": "Dinner"},
    {"id": 5, "name": "Supper"},
    {"id": 6, "name": "Drink"},
    {"id": 7, "name": "Else"},
  ]

  constructor(
    private searchFoodsService: SearchFoodsService
  ) {}


  ngOnInit(): void {
    this.filterFoodsFromInput();
  }

  test() {

  }

  // Setup food filtering
  filterFoodsFromInput() {
    this.filteredFoods = this.foodsForm.get('food_name')!.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value) => {
        if (value) {
          return this.searchFoodsService.searchFoods(value).pipe(
            catchError((error) => {
              console.error(error);
              return of([]);
            }),
            switchMap((response) => {
              this.foodsArray = response;
              return of(this.foodsArray);
            })
          );
        } else {
          return of([]);
        }
      })
    );
  }


  pickFood(food_id: number) {
    this.foodsForm.get('food_name')?.setValue('')
    this.searchFoodsService.fetchFoodWithId(food_id).subscribe(r => {
      this.dietFoodList.push(r)
    })
  }



  selectMeal() {

  }

  removeMealFromList() {

  }


}
