import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-diet-diary',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './diet-diary.component.html',
  styleUrl: './diet-diary.component.css'
})
export class DietDiaryComponent implements OnInit {
  dietForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.dietForm = this.fb.group({
      meals: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.addMeal(); // Initialize with one hobby
  }

  get meals(): FormArray {
    return this.dietForm.get('meals') as FormArray;
  }

  addMeal() {
    const mealForm = this.fb.group({
      name: ['', Validators.required]
    });
    this.meals.push(mealForm);
  }

  removeMeal(index: number) {
    this.meals.removeAt(index);
  }

  onSubmit() {
    console.log(this.dietForm.value);
  }
}