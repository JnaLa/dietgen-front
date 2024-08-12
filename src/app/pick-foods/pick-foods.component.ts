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

    // Selected meals
    meal_selections: new FormArray([]), // Dynamic

    foods_per_meal: new FormArray([]),

    test: new FormControl()

  })

  filteredFoods!: Observable<any[]>;
  foodsArray: any = []
  dietFoodList: any = []


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
    this.initializeMealSelections();
    this.filterFoodsFromInput();
  }


  // Initialize FormArray with FormGroup instances
  initializeMealSelections() {
    const mealSelectionsArray = this.meal_types.map((meal: any) =>
      new FormGroup({
        meal_id: new FormControl(meal.id),
        meal_name: new FormControl(meal.name),
      })
    );
    this.foodsForm.setControl('meal_selections', new FormArray(mealSelectionsArray));


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

      // this.dietFoodList.push({
      //   name: r.name.fi,
      //   amount: r.amount,
      //   energy: r.energy,
      //   energyKcal: r.energyKcal,
      //   carbohydrate: r.carbohydrate,
      //   fat: r.fat,
      //   saturatedFat: r.saturatedFat,
      //   fiber: r.fiber,
      //   protein: r.protein,
      //   salt: r.salt,
      //   sugar: r.sugar,
      // })

      this.dietFoodList.push(r)

      console.log(this.dietFoodList)

    })
  }


  saveFoods() {

  }

  selectMeal(meal_selected: any) {
    const meal_selections = this.foodsForm.get('meal_selections') as FormArray;

    //Check if the meal is already selected
    const existingIndex = meal_selections.controls.findIndex(
      (ctrl) => ctrl.get('meal_id')?.value === meal_selected.id
    );

    if (existingIndex === -1) {
      // Add new meal field if not already selected
      meal_selections.push(
        new FormGroup({
          meal_id: new FormControl(meal_selected.id),
          meal_name: new FormControl(meal_selected.name)
        })
      )
    }

    console.log(meal_selections.value);
  }


  hasMealType(meal_name: string): boolean {
    const meal_selections = this.foodsForm.get('meal_selections') as FormArray;
    return meal_selections.controls.some(
      (control) => control.get('meal_name')?.value === meal_name
    )
  }

  removeMeal(meal_name: string) {
    const meal_selections = this.foodsForm.get('meal_selections') as FormArray;
    const index = meal_selections.controls.findIndex(
      (control) => control.get('meal_name')?.value === meal_name
    );

    if (index !== -1) {
      meal_selections.removeAt(index);
    }
  }

  onFoodSearch(event: Event, index: number) {
    const input = (event.target as HTMLInputElement).value;
    const meal_selections = this.foodsForm.get('meal_selections') as FormArray;
    const currentMeal = meal_selections.at(index) as FormGroup;

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
        currentMeal.get('foods')?.setValue(results);
        console.log('Search results for meal', currentMeal.get('meal_name')?.value, ':', results);
      });
    }
  }









}
