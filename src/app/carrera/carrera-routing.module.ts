import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarreraComponent } from './carrera.component';

const routes: Routes = [
	{ path: 'carrera', component: CarreraComponent },    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class CarreraRoutingModule { }