import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlumnoComponent } from './alumno.component';
import { AlumnoCreateComponent } from './alumno-create/alumno-create.component';
import { AlumnoBuscadorComponent } from './alumno-buscador/alumno-buscador.component';
import { AlumnoDetailsComponent } from './alumno-details/alumno-details.component';


const routes: Routes = [
	{ path: 'alumno', component: AlumnoComponent },
	{ path: 'createAlumno', component: AlumnoCreateComponent },
	{ path: 'createAlumno/:id', component: AlumnoCreateComponent }, 
	{ path: 'buscadorAlumno', component: AlumnoBuscadorComponent }, 
	{ path: 'AlumnoDetails', component: AlumnoDetailsComponent },     
   
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AlumnoRoutingModule { }
