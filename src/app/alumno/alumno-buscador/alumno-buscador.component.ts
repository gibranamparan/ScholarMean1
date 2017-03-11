import { Component, OnInit } from '@angular/core';
import { Alumno } from '../alumno'
import { AlumnoService } from '../alumno.service';

@Component({
  selector: 'app-alumno-buscador',
  templateUrl: './alumno-buscador.component.html',
  styleUrls: ['./alumno-buscador.component.css']
})
export class AlumnoBuscadorComponent implements OnInit {
	Alumnos:Alumno[] = new Array();
  constructor(private _alumnoService:AlumnoService) { }

  ngOnInit() {
  	this.showAlumnos();
  }

  showAlumnos(){
  	this._alumnoService.getAlumnos(false)
  	.subscribe(
  		(data:Alumno[])=>{
  			this.Alumnos = data;
  			console.log(this.Alumnos)
  		},
  		err=>{
  			console.log(err);
  		}
	)
  }
}
