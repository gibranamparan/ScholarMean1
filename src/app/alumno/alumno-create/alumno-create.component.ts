import { Component, OnInit } from '@angular/core';
import { CarreraService } from '../../carrera/carrera-service.service';
import { AlumnoService } from '../../alumno/alumno.service';
import { Carrera } from '../../carrera/carrera';
import { Alumno } from '../../alumno/alumno';
import { Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-alumno-create',
  templateUrl: './alumno-create.component.html',
  styleUrls: ['./alumno-create.component.css']
})
export class AlumnoCreateComponent implements OnInit {
	Carreras:Carrera[]
	nuevoAlumno = new Alumno();
	alumnoID;
	constructor(private _carreraService:CarreraService,
		private _alumnoService:AlumnoService,
		private _router:Router,
		private _activatedRoute: ActivatedRoute) { }

	ngOnInit() {
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

	    // subscribe to router event
	    this._activatedRoute.params
	    .subscribe((params: Params) => {
        	this.alumnoID = params['id'];
	  	});

        if(this.alumnoID){
	        this._alumnoService.getAlumno(this.alumnoID)
	        .subscribe(
	        	(data:Alumno)=>{
					this.nuevoAlumno = data;
	        	},
				error=>alert(error),
				()=>console.log('done!')
        	);
      	}
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

	get testJson(){return JSON.stringify(this.nuevoAlumno)}

}
