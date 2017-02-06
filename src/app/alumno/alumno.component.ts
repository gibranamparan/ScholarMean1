import { Component, OnInit } from '@angular/core';
import { AlumnoService } from './alumno.service';
import { SimpleNotificationsComponent, NotificationsService } from 'angular2-notifications';
import { Alumno } from './alumno';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {
	Alumnos:Alumno[];

	public notifOptions = { //Opciones de notificacion
	position: ["top", "right"], timeOut: 2000,
	lastOnBottom: true
	}
	constructor(private alumnoService:AlumnoService,
    private _notificationsService : NotificationsService) {  }
    
	io = require("socket.io-client");
	socket = this.io('http://localhost:8000');

	ngOnInit() {
		this.showAlumnos();
	    //Evento de deteccion de registro creado
	    this.socket.on('AlumnoCreado', function(data){
	      this.Alumnos.push(data);
	      this._notificationsService.info("Nuevo","Registro de preinscripción");
	    }.bind(this));
	}

	showAlumnos(){
		this.alumnoService.getAlumnos()
		.subscribe(
			(data:Alumno[])=>{this.Alumnos = data},
			(error)=>{console.log(error)}
		)
	}

}
