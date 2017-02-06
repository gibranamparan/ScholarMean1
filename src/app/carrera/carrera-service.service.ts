import { Injectable } from '@angular/core';
import {Http} from '@angular/http'
import 'rxjs/add/operator/map'

@Injectable()
export class CarreraService{
	constructor(private _http:Http) {}

	private domain='http://localhost:8000/api/carrera/'

	getCarreras(){
		return this._http.get(this.domain)
		.map(res=>res.json())
	}

	addCarrera(carrera){
		return this._http.post(this.domain,carrera)
		.map(res=>res.json())
	}

	deleteCarrera(id){
		return this._http.delete(this.domain+id)
		.map(res=>res.json())
	}

	updateCarrera(carrera){
		return this._http.put(this.domain,carrera)
		.map(res=>res.json())
	}
}
