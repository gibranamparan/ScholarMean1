import { Injectable } from '@angular/core';
import {Http} from '@angular/http'
import 'rxjs/add/operator/map'

@Injectable()
export class GrupoService{
	constructor(private _http:Http) {}

	private domain='http://localhost:8000/api/grupo/'

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
