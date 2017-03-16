import { Injectable } from '@angular/core';
import { GlobalParamsService } from '../global-params.service';
import {Headers, RequestOptions, Http} from '@angular/http';
import { Pago } from './pagos';
import 'rxjs/add/operator/map';

@Injectable()
export class PagosService {

  constructor(private _http: Http, private _globalParams:GlobalParamsService) { }

  private URL = '/api/Depositos/';
  private domain=this._globalParams.domain+this.URL;

  //private domain:string = 'http://localhost:55994/deposito/'

	getPagos(){
		return this._http.get(this.domain)
		.map(res=>res.json())
	}

	addPago(Pago){
		return this._http.post(this.domain,Pago)
		.map(res=>res.json())
	}

}
