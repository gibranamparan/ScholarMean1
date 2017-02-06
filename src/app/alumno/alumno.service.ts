import { Injectable } from '@angular/core';
import {Http} from '@angular/http'
import 'rxjs/add/operator/map'

@Injectable()
export class AlumnoService {

  constructor(private _http:Http) {}

	private domain='http://localhost:8000/api/Alumno/'

	getAlumnos(){
		return this._http.get(this.domain)
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
