import { Component, OnInit } from '@angular/core';
import { Pago } from '../../pagos/pagos';
import { Alumno } from '../../alumno/alumno'
import { PagosService } from '../../pagos/pagos.service';
import { AlumnoService } from '../../alumno/alumno.service';

@Component({
  selector: 'app-pagos-buscador',
  templateUrl: './pagos-buscador.component.html',
  styleUrls: ['./pagos-buscador.component.css']
})
export class PagosBuscadorComponent implements OnInit {
	
	Pagos:Pago[] = new Array();
	filtro = {inicio:"",final:""};

  constructor(private _pagosService:PagosService,
  	private _alumnoService:AlumnoService) { }

  ngOnInit() {
  }

  showPagosBusqueda(){
  	this._pagosService.getPagosByFecha(this.filtro)
  	.subscribe(
  		data=>{ this.Pagos = data; },
  		error=>alert(error),
  		()=>console.log(JSON.stringify(this.filtro))
  	);
  }

mostrarFiltro(){
  console.log(JSON.stringify(this.filtro))
}

}
