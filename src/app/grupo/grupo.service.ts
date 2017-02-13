import { Injectable } from '@angular/core';
import {Http} from '@angular/http'
import 'rxjs/add/operator/map'
import { GlobalParamsService } from '../global-params.service';

@Injectable()
export class GrupoService{
	constructor(private _http:Http,
		private _globalParams:GlobalParamsService) {}

	private apiURL = '/api/grupo/';
	private domain=this._globalParams.domain+this.apiURL;

	getGrupos(){
		return this._http.get(this.domain)
		.map(res=>res.json())
	}

	getGrupo(id){
		return this._http.get(this.domain+id)
		.map(res=>res.json())
	}

	registrarAlumno(alumno){
		return this._http.post(this.domain+'registrarAlumno/',alumno)
		.map(res=>res.json())
	}
}
