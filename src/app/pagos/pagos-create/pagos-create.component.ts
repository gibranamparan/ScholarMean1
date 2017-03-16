import { Component, OnInit, AfterContentInit, ChangeDetectorRef} from '@angular/core';
import { PagosService } from '../../pagos/pagos.service';
import { Pago } from '../../pagos/pagos';
import { Router, ActivatedRoute, Params} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subscriber} from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-pagos-create',
  templateUrl: './pagos-create.component.html',
  styleUrls: ['./pagos-create.component.css']
})
export class PagosCreateComponent implements OnInit {

	nuevoPago = new Pago();
	//fecha:

  constructor(private _pagoService:PagosService,
		private _router:Router,
		private _activatedRoute: ActivatedRoute,
		private ref:ChangeDetectorRef) { }

  ngOnInit() {
  }

	agregarPago(){
		this._pagoService.addPago(this.nuevoPago)
		.subscribe(
			(data:Pago)=>{
				//Si el pago se dio de alta satisfactoriamente
				this._router.navigate(['pagosList'])
			},
			error=>alert(error),
			()=>console.log('done!')
		);
	}

}
