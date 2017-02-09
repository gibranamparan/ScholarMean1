import { Injectable } from '@angular/core';
import {Http} from '@angular/http'
import 'rxjs/add/operator/map'
import { GlobalParamsService } from '../global-params.service';

@Injectable()
export class AlumnoService {

  constructor(private _http:Http,
		private _globalParams:GlobalParamsService) {}

	private apiURL = '/api/Alumno/';
	private domain=this._globalParams.domain+this.apiURL;

	getAlumnos(){
		return this._http.get(this.domain)
		.map(res=>res.json())
	}

	getAlumno(id){
		return this._http.get(this.domain+id)
		.map(res=>res.json())
	}

	addAlumno(Alumno){
		return this._http.post(this.domain,Alumno)
		.map(res=>res.json())
	}

	deleteAlumno(id){
		return this._http.delete(this.domain+id)
		.map(res=>res.json())
	}

	updateAlumno(Alumno){
		return this._http.put(this.domain,Alumno)
		.map(res=>res.json())
	}

}
