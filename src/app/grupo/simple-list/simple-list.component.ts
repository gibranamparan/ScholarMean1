import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Grupo } from '../grupo';
import { GrupoService } from '../grupo.service';
import { AlumnoService } from '../../alumno/alumno.service'
import { GlobalParamsService } from '../../global-params.service';

@Component({
  selector: 'grupo-simple-list',
  templateUrl: './simple-list.component.html',
  styleUrls: ['./simple-list.component.css']
})
export class SimpleListComponent implements OnInit {
	@Input() grupoID:string;
	@Output() onRowSelected = new EventEmitter<any[]>();
	@Output() onBindingAlumnos = new EventEmitter<any[]>();

	grupo:Grupo = new Grupo();
	vmAlumnos:any[]; //Alumnos del grupo
	private _vmAlumnosIn:any[]; //Alumnos ingresados de otro grupo

	io = require("socket.io-client");
	socket = this.io(this._globalParams.domain);
	constructor(private _grupoService:GrupoService,
		private _alumnoService:AlumnoService,
    	private _globalParams:GlobalParamsService) {
	    //Evento de deteccion de registro creado
	    this.socket.on('alumnoInscritoAGrupo', function(alumno){
	    	if(alumno._grupo._id==this.grupoID){
		      this.grupo._alumnos.push(alumno);
		      this.grupo._alumnos = this._alumnoService.
		      	sortList_ApellidoP_asc(this.grupo._alumnos);
		      this.vmAlumnos = this.grupo._alumnos;
		      this.onBindingAlumnos.emit(this.vmAlumnos);
	      	}
	    }.bind(this));
    }

	ngOnInit() {
		if(this.grupoID){
			this._grupoService.getGrupo(this.grupoID)
			.subscribe(
	  		(data)=>{
	  			//Se toman y se ordenan por matricula
		        this.grupo = data;
		        this.vmAlumnos = this._alumnoService.sortList_ApellidoP_asc(this.grupo._alumnos);
				this.onBindingAlumnos.emit(this.vmAlumnos);
	      	},
		  		error=>console.log(error),
		  		()=>console.log('done!')
		  	);
		}
	}

	//Selecciona un estudiante de la lista y emite un evento
	seleccionarAlumno(alumnoID){
		var index = this.vmAlumnos.
		indexOf(this.vmAlumnos
			.find(al=>al._id==alumnoID)
		);
		//Toggle seleccion del renglon
		this.vmAlumnos[index].selected = !this.vmAlumnos[index].selected;
		//Si se selecciona algun renglon, se emite al padre los renglones seleccionados
		this.onRowSelected.emit(this.vmAlumnos.filter(al=>al.selected));
	}

	/*SE RECIBEN LOS ESTUDIANTES SELECCIONADOS DE UN GRUPO DIFERENTE*/
	@Input()
	set vmAlumnosIn(vmAlumnosIn:any[]){
		if(vmAlumnosIn){
			this._vmAlumnosIn = vmAlumnosIn;
			this.vmAlumnos = this.vmAlumnos.concat(vmAlumnosIn);
			this.vmAlumnos = this._alumnoService.sortList_ApellidoP_asc(this.vmAlumnos);
			this.onBindingAlumnos.emit(this.vmAlumnos);
		}
	}

	/*SE reciben los estudiantes que se pasan a otro grupo y se eliminan de este*/
	@Input()
	set alumnosRemove(alumnosRemove:any[]){
		if(alumnosRemove){
			for(let alumno of alumnosRemove){
				var alumnoBorrar = this.vmAlumnos.filter(al=>al._id==alumno._id)[0];
				var index = this.vmAlumnos.indexOf(alumnoBorrar);
				this.vmAlumnos.splice(index,1);
			}
			this.onBindingAlumnos.emit(this.vmAlumnos);
		}
	}
}
