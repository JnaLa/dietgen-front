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



@Component({
  selector: 'app-diary',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatInputModule,
    
  ],
  templateUrl: './diary.component.html',
  styleUrl: './diary.component.css'
})


export class DiaryComponent {

  constructor(
    private searchFoodsService: SearchFoodsService
  ) {}

  mealTypes: any = [] 


  ngOnInit(): void {
    this.searchFoodsService.fetchMealTypes().subscribe(r => {
      this.mealTypes = r
    }) 
  }

  selectMeal(meal: any) {
    console.log(meal)
  }

  test() {

  }




}
