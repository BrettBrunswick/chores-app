import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChoresComponent } from '../components/chores/chores.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'chores', pathMatch: 'full' },
  { path: 'chores', component: ChoresComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
