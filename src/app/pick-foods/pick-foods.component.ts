import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    FontAwesomeModule,
    FormsModule,
    
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


  })

  filteredFoods!: Observable<any[]>;
  foodsArray: any = [] // All matching foods
  dietFoodList: any = []  // Displayed on table


  meal_types: any = [
    {"id": 1, "name": "Breakfast"},
    {"id": 2, "name": "Brunch"},
    {"id": 3, "name": "Lunch"},
    {"id": 4, "name": "Snack"},
    {"id": 5, "name": "Dinner"},
    {"id": 6, "name": "Supper"},
    {"id": 7, "name": "Drink"},
    {"id": 8, "name": "Else"},
  ]

  selectedMeals: any[] = [];
  meal_search_results: any = []

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



  selectMeal(meal: any) {
    if (!meal || !meal.id) {
      console.error('Invalid meal object:', meal);
      return;
    }
  
    // Check if the meal is already selected
    const mealExists = this.selectedMeals.some(
      (selectedMeal) => selectedMeal.id === meal.id
    );

    if (!mealExists) {
      this.selectedMeals.push({
        meal_id: meal.id,
        meal_name: meal.name,
        search_food: ''
      });
    }
  }

  removeMealFromList(meal: any) {
    this.selectedMeals = this.selectedMeals.filter(selectedMeal => selectedMeal.meal_id !== meal.meal_id)
  }

  onFoodSearch(event: Event, meal: any) {
    const input = (event.target as HTMLInputElement).value;

    // Perform a food search using the service
    if (input) {
      this.searchFoodsService.searchFoods(input).pipe(
        debounceTime(300),
        distinctUntilChanged(),
        catchError(error => {
          console.error('Error fetching foods:', error);
          return of([]);
        })
      ).subscribe(results => {
        meal.search_results = results; // Update the meal with search results
        
        this.meal_search_results = results;
        console.log(this.meal_search_results)
        
      });
    }
  }


}
