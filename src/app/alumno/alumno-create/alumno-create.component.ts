import { Component, OnInit, AfterContentInit, ChangeDetectorRef} from '@angular/core';
import { CarreraService } from '../../carrera/carrera-service.service';
import { AlumnoService } from '../../alumno/alumno.service';
import { Carrera } from '../../carrera/carrera';
import { Alumno } from '../../alumno/alumno';
import { Router, ActivatedRoute, Params} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subscriber} from 'rxjs';

@Component({
  selector: 'app-alumno-create',
  templateUrl: './alumno-create.component.html',
  styleUrls: ['./alumno-create.component.css']
})
export class AlumnoCreateComponent implements OnInit,AfterContentInit {
	Carreras:Carrera[]
	nuevoAlumno = new Alumno();
	alumnoID:string;
	carreraID:string='';

	constructor(private _carreraService:CarreraService,
		private _alumnoService:AlumnoService,
		private _router:Router,
		private _activatedRoute: ActivatedRoute, private ref:ChangeDetectorRef) {
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
						this.nuevoAlumno = data;
						this.carreraID = this.nuevoAlumno._carrera._id;
						this.ref.detectChanges();
		        	},
					error=>alert(error),
					()=>console.log('done!')
	        	);
	        	
	      	}
	}

	ngOnInit() {
		//Obtiene las carreras para rellenar dropdown
		this._carreraService.getCarreras()
		.subscribe(
			(data:Carrera[])=>{
				//Se toma la lista de carrera y se ordena alfatabeticamente
				this.Carreras = data.sort((a:Carrera,b:Carrera)=>{
				if(a.nombre>b.nombre)
					return 1;
				if(a.nombre<b.nombre)
					return -1;
				return 0;
			});},
			(error)=>{console.log(error)},
		);
	}

	ngAfterContentInit(){
	}

	guardarAlumno(){
		this._alumnoService.addAlumno(this.nuevoAlumno)
		.subscribe(
			(data:Alumno)=>{
				this.nuevoAlumno = data;
				this._router.navigate(['alumno'])
			},
			error=>alert(error),
			()=>console.log('done!')
		);
	}

	itemSelected(optionCarreraID){
		console.log(this.nuevoAlumno);
		let alumnoCarreraID = '';
		if(this.nuevoAlumno._carrera._id!=null)
			alumnoCarreraID = this.nuevoAlumno._carrera._id;
		return optionCarreraID == alumnoCarreraID;
	}

	get testJson(){return JSON.stringify(this.nuevoAlumno)}

}
