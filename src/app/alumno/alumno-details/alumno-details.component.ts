import { Component, OnInit } from '@angular/core';
import { Alumno } from '../alumno';
import { AlumnoService} from '../../alumno/alumno.service';


@Component({
  selector: 'app-alumno-details',
  templateUrl: './alumno-details.component.html',
  styleUrls: ['./alumno-details.component.css']
})
export class AlumnoDetailsComponent implements OnInit {

	currentUser: any;
	alumno: Alumno = new Alumno();

  constructor(private _alumnoService:AlumnoService) {

 	this.currentUser = JSON.parse(localStorage.getItem('currentUser'));


   }

  ngOnInit() {
  	//Buscar el alumno que tiene el su llave foranea _usuario igual a la clave primaria de currentUser
  	this._alumnoService.getAlumnoByUserID(this.currentUser._id)
  	.subscribe((data:Alumno)=>{
  		this.alumno=data;
  	},
  	error=>alert(error),
	()=>console.log('done!')
  	);
  }



} 