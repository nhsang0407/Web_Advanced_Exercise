import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Ex13 } from './ex13/ex13';
import { Ex13Detail } from './ex13-detail/ex13-detail';

const routes: Routes = [
  {path:"", redirectTo:"ex13", pathMatch:"full"},
  {path:"ex13", component:Ex13},
  {path:"ex13/:id", component:Ex13Detail},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
