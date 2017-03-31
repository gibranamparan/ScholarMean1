import { Component, OnInit, AfterContentInit, ChangeDetectorRef} from '@angular/core';
import { CarreraService } from '../../carrera/carrera-service.service';
import { AlumnoService, AlumnoStatus } from '../../alumno/alumno.service';
import { GrupoService } from '../../grupo/grupo.service';
import { Carrera } from '../../carrera/carrera';
import { Alumno } from '../../alumno/alumno';
import { Grupo } from '../../grupo/grupo';
import { UserLogin } from '../../usuario/userLogin';
import { Router, ActivatedRoute, Params} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subscriber} from 'rxjs';
import * as moment from 'moment';




@Component({
  selector: 'app-alumno-create',
  templateUrl: './alumno-create.component.html',
  styleUrls: ['./alumno-create.component.css']
})
export class AlumnoCreateComponent implements OnInit {
	Carreras:Carrera[]
	nuevoAlumno = new Alumno();
	alumnoID:string;
	alumnoStatus = AlumnoStatus.EnRegistro;
	userLogin:UserLogin = new UserLogin();

	private _moment = moment();
	constructor(private _carreraService:CarreraService,
		private _alumnoService:AlumnoService,
		private _grupoService:GrupoService,
		private _router:Router,
		private _activatedRoute: ActivatedRoute,
		private ref:ChangeDetectorRef) {
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
						this.nuevoAlumno.FechaNac = 
							moment(this.nuevoAlumno.FechaNac)
							.format('YYYY-MM-DD');
						console.log(this.nuevoAlumno.FechaNac);
						this.userLogin = this.nuevoAlumno._usuario;

						this.determinarStatusAlumno();
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
			    this.Carreras = this._carreraService
			      .sortList_nombre_asc(data);

			    //Se determina las funciones que tendra la forma
			    this.determinarStatusAlumno();
			},
			(error)=>{console.log(error)},
		);
	}

	guardarAlumno(){
		let usuario:UserLogin = JSON.parse(localStorage.getItem('currentUser'));
		if(this.alumnoStatus == AlumnoStatus.EnRegistro){
			//Si el alumno esta en registro, se crea nuevo registro
			this.agregarAlumno();
		}else
		{
			//Si ya estaba registrado, solo se modifica
			this.modificarAlumno();
		}

		this._router.navigate(['alumno']);
			if(!usuario)
			{
				this._router.navigate(['login']);
			}else if(usuario.rol=='admin'){
				this._router.navigate(['carrera']);
			}
	}

	agregarAlumno(){
		this._alumnoService.addAlumno(this.nuevoAlumno, this.userLogin)
		.subscribe(
			(data:Alumno)=>{ },
			error=>alert(error),
			()=>console.log('done!')
		);
	}

	modificarAlumno(){
		this._alumnoService.updateAlumno(this.nuevoAlumno)
		.subscribe(
			(data:Alumno)=>{ },
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

	confirmarInscripcion(){
		this.modificarAlumno();
		this._alumnoService.registrarAlumno(this.nuevoAlumno._id)
		.subscribe(
			(data:Grupo)=>{
				this._router.navigate(['alumno']);
			},
			error=>alert(error),
			()=>console.log('done!')
		);
	}

	determinarStatusAlumno(){
		//Esta inscrito si tiene grupo
		if(this.nuevoAlumno._grupo)
			this.alumnoStatus = AlumnoStatus.Inscrito;
		//Si no tiene grupo pero si carrera, esta preinscrito
		else if(this.nuevoAlumno._carrera){
			this.alumnoStatus = AlumnoStatus.Preinscrito;
		}
		//Si no cumple con ninguna condicion previa, esta en registro
	}

	estaInscrito(){
		return this.alumnoStatus == AlumnoStatus.Inscrito;
	}

	showInscribirButton(){
		return this.alumnoStatus == AlumnoStatus.Preinscrito;
	}

	get testJson(){return JSON.stringify(this.nuevoAlumno)}

}
