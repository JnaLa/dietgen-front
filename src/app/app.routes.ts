import { Routes } from '@angular/router';
import { PickFoodsComponent } from './pick-foods/pick-foods/pick-foods.component';
import { DietDiaryComponent } from './diet-diary/diet-diary.component';

export const routes: Routes = [
    { path: "", component: PickFoodsComponent },
    { path: "diary", component: DietDiaryComponent }
];
