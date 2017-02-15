import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { CarreraService } from '../carrera-service.service';
import { GrupoService } from '../../grupo/grupo.service';
import { Carrera } from '../carrera';
import { Grupo } from '../../grupo/grupo';

@Component({
  selector: 'app-carrera-details',
  templateUrl: './carrera-details.component.html',
  styleUrls: ['./carrera-details.component.css']
})
export class CarreraDetailsComponent implements OnInit {
	carreraID:string;
	carrera:Carrera = new Carrera();
  grupoID1:string;
  grupoID2:string;

  constructor(private _activatedRoute: ActivatedRoute,
    private _carreraService : CarreraService,
    private _grupoService : GrupoService) {
  	// Toma el ID del registro en la URL
    this._activatedRoute.params
    .subscribe((params: Params) => {
    	this.carreraID = params['id'];
  	});

  	this._carreraService.getCarrera(this.carreraID)
  	.subscribe(
  		(data:Carrera)=>{
        this.carrera = data;
        this.grupoID1 = this.carrera._grupos[0]._id;
        if(this.carrera._grupos.length>1){
          this.grupoID2 = this.carrera._grupos[2]._id;
        }
        console.log('Carrera: '+JSON.stringify(this.carrera))
        console.log('grupoID1: '+JSON.stringify(this.grupoID1))
      },
  		error=>alert(error),
  		()=>console.log('done!')
  	);
  }

  ngOnInit() {
  }

  crearNuevoGrupo(){
    this._grupoService.addGrupo(this.carreraID)
    .subscribe(
        (data:Grupo)=>{
          this.grupoID2 = data._id;
        },
        ()=>{}
      )
  }

}
