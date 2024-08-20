import { Component, Inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { SearchFoodsService } from '../services/search-foods.service';
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";


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

  userInfoForm = new FormGroup({

    // User info
    nickName: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    height: new FormControl('', Validators.required),
    weight: new FormControl('', Validators.required),

    // Goals
    targetWeight: new FormControl('', Validators.required),

    desiredKcal: new FormControl(),
    desiredProtein: new FormControl(),
    desiredCarbs: new FormControl(),
    desiredFats: new FormControl(),
  })
  
  constructor(
    private searchFoodsService: SearchFoodsService,
    public dialog: MatDialog
  ) {}

  @Inject(MAT_DIALOG_DATA) public dialogData: any;

  mealTypes: any = []
  genders: any = ["Male", "Female", "Other"]


  ngOnInit(): void {
    this.fetchMealTypes();
  }

  fetchMealTypes() {
    this.searchFoodsService.fetchMealTypes().subscribe(r => {
      this.mealTypes = r
    }) 
  }
    


  openMealsDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    
  ) {
    let formData = this.userInfoForm.getRawValue();
    console.log(formData)
  }




}
