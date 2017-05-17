import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagosComponent } from './pagos.component';
import { PagosCreateComponent } from './pagos-create/pagos-create.component';
import { AlumnoCreateComponent } from '../alumno/alumno-create/alumno-create.component';
import { PagosBuscadorComponent } from './pagos-buscador/pagos-buscador.component';


const routes: Routes = [
	{path: 'pagosBuscador', component:PagosBuscadorComponent},
	{ path:'pagosList', component:PagosComponent} ,
	{path: 'createAlumno/:id', component: AlumnoCreateComponent},
	{ path:'createPago', component:PagosCreateComponent}, 
	{ path:'createPago/:id', component:PagosCreateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class PagosRoutingModule { }
