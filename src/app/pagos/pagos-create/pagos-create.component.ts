import { Component, OnInit, AfterContentInit, ChangeDetectorRef} from '@angular/core';
import { PagosService } from '../../pagos/pagos.service';
import { Pago } from '../../pagos/pagos';
import { Alumno } from '../../alumno/alumno';
import { AlumnoService } from '../../alumno/alumno.service';
import { Router, ActivatedRoute, Params} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subscriber} from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-pagos-create',
  templateUrl: './pagos-create.component.html',
  styleUrls: ['./pagos-create.component.css']
})
export class PagosCreateComponent implements OnInit {

	nuevoPago = new Pago();
	alumnoID:string;
	alumno = new Alumno();
	//fecha:

  constructor(private _pagoService:PagosService,
		private _router:Router,
		private _alumnoService:AlumnoService,
		private _activatedRoute: ActivatedRoute) {
			// Toma el ID del registro en la URL
		    this._activatedRoute.params
		    .subscribe((params: Params) => {
	        	this.alumnoID = params['id'];
		  	});

		  	//Si se envio ID
	        if(this.alumnoID){
		        this._alumnoService.getAlumno(this.alumnoID)
		        .subscribe(
		        	(data:Alumno)=>{
						this.alumno = data;
						/*this.alumno.FechaNac = 
							moment(this.alumno.FechaNac)
							.format('YYYY-MM-DD');
						console.log(this.alumno.FechaNac);*/
						//this.userLogin = this.alumno._usuario;

						//this.determinarStatusAlumno();
		        	},
					error=>alert(error),
					()=>console.log('done!')
	        	);
	      	}
		 }

  ngOnInit() {
  	//Tomar el ID de params a traves de activatedRoute

  	//So existe el ID, buscaras el alumno en la base de datos por ID

  	//Si lo encuentra, guardar los datos del alkumno en la variable globla alumno
  }

  

	agregarPago(){
		this.nuevoPago._alumno = this.alumno._id;
		this._pagoService.addPago(this.nuevoPago)
		.subscribe(
			(data:Pago)=>{
				//Si el pago se dio de alta satisfactoriamente
				this._router.navigate(['pagosList'])
			},
			error=>alert(error),
			()=>console.log('done!')
		);
	}

}
