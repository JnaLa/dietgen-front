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
import { ProfileService } from '../services/profile.service';


@Component({
  selector: 'app-profiles',
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
  templateUrl: './profiles.component.html',
  styleUrl: './profiles.component.css'
})


export class ProfilesComponent {

  profileForm = new FormGroup({

    // User info
    nickName: new FormControl('', Validators.required),
    age: new FormControl(null, Validators.required),
    gender: new FormControl('', Validators.required),
    height: new FormControl(null, Validators.required),
    weight: new FormControl(null, Validators.required),
    bio: new FormControl('')

    // Goals
    // targetWeight: new FormControl('', Validators.required),

    // desiredKcal: new FormControl(),
    // desiredProtein: new FormControl(),
    // desiredCarbs: new FormControl(),
    // desiredFats: new FormControl(),
  })
  
  constructor(
    private searchFoodsService: SearchFoodsService,
    public dialog: MatDialog,
    private profileService: ProfileService
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
      console.log(r)
    }) 
  }

  addProfileInfo() {
    let profileData = this.profileForm.getRawValue()

    this.profileService.addProfileData(profileData).subscribe(r => {
      console.log(r)
    })
  }















    
  openMealsDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    
  ) {
    let formData = this.profileForm.getRawValue();
    console.log(formData)
  }




}
