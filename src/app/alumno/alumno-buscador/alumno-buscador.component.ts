import { Component, OnInit } from '@angular/core';
import { Alumno } from '../alumno'
import { Carrera } from '../../carrera/carrera'
import { Grupo } from '../../grupo/grupo'
import { AlumnoService } from '../alumno.service';
import { CarreraService } from '../../carrera/carrera-service.service';
import { GrupoService } from '../../grupo/grupo.service';

@Component({
  selector: 'app-alumno-buscador',
  templateUrl: './alumno-buscador.component.html',
  styleUrls: ['./alumno-buscador.component.css']
})
export class AlumnoBuscadorComponent implements OnInit {
	Alumnos:Alumno[] = new Array();
  Carreras:Carrera[] = new Array();
  Grupos:Grupo[] = new Array();
	filtro:Alumno = new Alumno();
  constructor(private _alumnoService:AlumnoService,
    private _carreraService:CarreraService,
    private _grupoService:GrupoService) { }

  ngOnInit() {
  	this.filtro._carrera="";
  	this.showAlumnos();
    this._carreraService.getCarreras()
    .subscribe(
      (data:Carrera[])=>{
        this.Carreras = data;
      },
      err=>{}
    );

    this._grupoService.getGrupos()
    .subscribe(
      (data:Grupo[])=>{
        this.Grupos = data;
      },
      err=>{}
    )
  }

  showAlumnos(){
  	this._alumnoService.getAlumnosInscritos(this.filtro)
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

  seleccionCarrera(){
    let carr = this.Carreras.filter(car=>car._id == this.filtro._carrera)[0];
    this.Grupos = carr._grupos;
    this.buscar()    
  }

  buscar(){
    this.showAlumnos();
  }
}
