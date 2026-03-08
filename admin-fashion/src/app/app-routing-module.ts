import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FashionListComponent } from './fashion-list/fashion-list.component';
import { FashionFormComponent } from './fashion-form/fashion-form.component';
import { FashionDetailComponent } from './fashion-detail/fashion-detail.component';

const routes: Routes = [
  { path: '', component: FashionListComponent },
  { path: 'fashion/new', component: FashionFormComponent },
  { path: 'fashion/edit/:id', component: FashionFormComponent },
  { path: 'fashion/:id', component: FashionDetailComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
