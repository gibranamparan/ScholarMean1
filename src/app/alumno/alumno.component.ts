import { Component, OnInit } from '@angular/core';
import { AlumnoService } from './alumno.service';
import { SimpleNotificationsComponent, NotificationsService } from 'angular2-notifications';
import { Alumno } from './alumno';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { GlobalParamsService } from '../global-params.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {
	Alumnos:Alumno[];//Contenedor de datos

	constructor(private _globalParams:GlobalParamsService,
		private alumnoService:AlumnoService,
    	private _notificationsService : NotificationsService) {  }
    

	public notifOptions = this._globalParams.notificationOptions;

	//Se inicializan servicios de websockets
	io = require("socket.io-client");
	socket = this.io(this._globalParams.domain);

	ngOnInit() {
		this.showAlumnos();
	    //Evento de deteccion de registro creado
	    this.socket.on('AlumnoCreado', function(data){
	      this.Alumnos.push(data);
	      this.sortAlumnosByDate();
	      let carrera = data._carrera.abreviacion;
	      this._notificationsService.info("Nuevo",
	      	"Registro de preinscripción en "+carrera);
	    }.bind(this));
	}

	showAlumnos(){
		this.alumnoService.getAlumnos()
		.subscribe(
			(data:Alumno[])=>{
				this.Alumnos = data;
				this.sortAlumnosByDate();
			},
			(error)=>{console.log(error)}
		);
	}

	sortAlumnosByDate(){
		this.Alumnos = this.Alumnos.sort((a:Alumno,b:Alumno)=>{
				if(a.createdAt<b.createdAt)
					return 1;
				if(a.createdAt>b.createdAt)
					return -1;
				return 0;
			});
	}

}
