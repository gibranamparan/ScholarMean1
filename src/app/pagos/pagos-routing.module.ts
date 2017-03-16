import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagosComponent } from './pagos.component';
import { PagosCreateComponent } from './pagos-create/pagos-create.component';

const routes: Routes = [
	{ path:'pagosList', component:PagosComponent} ,
	{ path:'createPago', component:PagosCreateComponent} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class PagosRoutingModule { }
