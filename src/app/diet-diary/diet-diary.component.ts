import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchFoodsService } from '../services/search-foods.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-diet-diary',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './diet-diary.component.html',
  styleUrl: './diet-diary.component.css'
})
export class DietDiaryComponent implements OnInit {
  
  dietForm: FormGroup;
  searchQuery: string = '';
  searchResults: any[] = [];

  constructor(private fb: FormBuilder, private searchFoodsService: SearchFoodsService) {
    this.dietForm = this.fb.group({
      meals: this.fb.array([])
    });
    console.log('DietDiaryComponent initialized');
  }

  ngOnInit(): void {
    //this.addMeal(); // Initialize with one meal
  }

  get meals(): FormArray {
    return this.dietForm.get('meals') as FormArray;
  }

  addMeal() {
    const mealForm = this.fb.group({
      name: ['', Validators.required],
      food_search: [''],
      selected_foods: this.fb.array([]),
      searchResults: [[]]
    });
    this.meals.push(mealForm);
    console.log('Meal added:', mealForm);
  }
  getSelectedFoodControls(mealIndex: number): FormArray {
    return this.meals.at(mealIndex).get('selected_foods') as FormArray;
  }
  onFoodSearch(event: any, index: number): void {
    const query = event.target.value;
    if (query.length > 2) {
      this.searchFoodsService.searchFoods(query).pipe(
        catchError(error => {
          console.error('Search error:', error);
          return of([]);
        })
      ).subscribe(results => {
        const meals = this.dietForm.get('meals') as FormArray;
        const meal = meals.at(index) as FormGroup;
        meal.patchValue({ searchResults: results });
        //this.searchResults = results;
        console.log(`Search results for meal ${index}:`, results);
      });
    }
  }

  removeMeal(index: number) {
    this.meals.removeAt(index);
    console.log('Meal removed at index:', index);
  }
  selectFood(food: any, index: number): void {
    const selectedFoods = this.meals.at(index).get('selected_foods') as FormArray;

    console.log('Selecting food:', food, 'for meal index:', index);

    
    this.searchFoodsService.fetchFoodWithId(food.id).subscribe(fetchedFood => {
      const foodWithNutrients = {
        ...food,
        nutrients: {
          energy: fetchedFood.energy || 0,
          protein: fetchedFood.protein || 0,
          fat: fetchedFood.fat || 0,
          carbohydrate: fetchedFood.carbohydrate || 0,
          fiber: fetchedFood.fiber || 0,
          sugar: fetchedFood.sugar || 0,
        }
      };
      console.log('fetchFoodWithId:', fetchedFood);
      selectedFoods.push(this.fb.control(foodWithNutrients));

      // Reset search input and results
      const meal = this.meals.at(index) as FormGroup;
      meal.patchValue({ food_search: '', searchResults: [] });
      console.log('Food selected:', foodWithNutrients, 'for meal index:', index);
    });
  }
  removeSelectedFood(index: number, foodIndex: number) {
    const selectedFoods = this.meals.at(index).get('selected_foods') as FormArray;
    selectedFoods.removeAt(foodIndex);
    console.log('Selected food removed at index:', foodIndex, 'for meal index:', index);
  }

  onSubmit() {
    console.log('Form submitted:', this.dietForm.value);
  }
}