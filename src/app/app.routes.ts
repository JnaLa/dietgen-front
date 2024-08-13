import { Routes } from '@angular/router';
import { PickFoodsComponent } from './pick-foods/pick-foods.component';
import { DietDiaryComponent } from './diet-diary/diet-diary.component';
import { DiaryComponent } from './diary/diary.component';

export const routes: Routes = [
    { path: "", component: DiaryComponent },
    { path: "diary", component: DietDiaryComponent }
];
