import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { CarreraService } from '../carrera-service.service';
import { Carrera } from '../carrera';

@Component({
  selector: 'app-carrera-details',
  templateUrl: './carrera-details.component.html',
  styleUrls: ['./carrera-details.component.css']
})
export class CarreraDetailsComponent implements OnInit {
	carreraID:string;
	carrera:Carrera = new Carrera();
  constructor(private _activatedRoute: ActivatedRoute,
  	private _carreraService : CarreraService) {
  	// Toma el ID del registro en la URL
    this._activatedRoute.params
    .subscribe((params: Params) => {
    	this.carreraID = params['id'];
  	});

  	this._carreraService.getCarrera(this.carreraID)
  	.subscribe(
  		(data:Carrera)=>{
        this.carrera = data;
        console.log(this.carrera)
      },
  		error=>alert(error),
  		()=>console.log('done!')
  	);
  }

  ngOnInit() {
  }

}
