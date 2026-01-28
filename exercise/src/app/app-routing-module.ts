import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Ex13 } from './ex13/ex13';
import { Ex13Detail } from './ex13-detail/ex13-detail';
import { Ex21 } from './ex21/ex21';
import { Ex22 } from './ex22/ex22';
import { Ex10LunarYearComponent } from './ex10-lunar-year/ex10-lunar-year';
import { Ex14CatalogService } from './ex14-catalog-service/ex14-catalog-service';
import { Ex18 } from './ex18/ex18';

const routes: Routes = [
  {path:"", redirectTo:"ex22", pathMatch:"full"},
  {path:"ex10", component:Ex10LunarYearComponent},
  {path:"ex13", component:Ex13},
  {path:"ex13/:id", component:Ex13Detail},
  {path:"ex14", component:Ex14CatalogService},
  {path:"ex18", component:Ex18},
  {path:"ex21", component:Ex21},
  {path:"ex22", component:Ex22},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
