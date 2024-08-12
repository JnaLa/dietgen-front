import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchFoodsService } from '../services/search-foods.service';

@Component({
  selector: 'app-diet-diary',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './diet-diary.component.html',
  styleUrl: './diet-diary.component.css'
})
export class DietDiaryComponent implements OnInit {
  dietForm: FormGroup;
  searchResults: any[] = [];

  constructor(private fb: FormBuilder, private searchFoodsService: SearchFoodsService) {
    this.dietForm = this.fb.group({
      meals: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.addMeal(); // Initialize with one meal
  }

  get meals(): FormArray {
    return this.dietForm.get('meals') as FormArray;
  }

  addMeal() {
    const mealForm = this.fb.group({
      name: ['', Validators.required],
      food_search: [''],
      selected_food: this.fb.array([])
    });
    this.meals.push(mealForm);
  }
  onFoodSearch(event: any, index: number): void {
    const query = event.target.value;
    if (query.length > 2) {
      this.searchFoodsService.searchFoods(query).subscribe(results => {
        this.searchResults = results;
      });
    }
  }

  removeMeal(index: number) {
    this.meals.removeAt(index);
  }
  selectFood(food: any, index: number): void {
    const selectedFoods = this.meals.at(index).get('selected_food') as FormArray;
    selectedFoods.push(this.fb.control(food));
    this.searchResults = [];
  }
  removeSelectedFood(index: number, foodIndex: number) {
    const selectedFoods = this.meals.at(index).get('selected_food') as FormArray;
    selectedFoods.removeAt(foodIndex);
  }

  onSubmit() {
    console.log(this.dietForm.value);
  }
}