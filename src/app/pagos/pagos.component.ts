import { Component, OnInit } from '@angular/core';
import { Pago } from './pagos';
import { PagosService } from './pagos.service';
import { SimpleNotificationsComponent, NotificationsService } from 'angular2-notifications';
import { GlobalParamsService } from '../global-params.service';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {

  constructor(private _pagosService : PagosService,
    private _notificationsService : NotificationsService,
    private _globalParams:GlobalParamsService
  	) { }

	public pagos:Pago[];
  	public notifOptions = this._globalParams.notificationOptions;

  	io = require("socket.io-client");
  	socket = this.io(this._globalParams.domain);

  ngOnInit() {
  	this.showPagos();
    this.socket.on('pagoCreado', function(data){
      this.showPagos()
      this.pagos.push(data);
      this._notificationsService.info("Nuevo","Registro de pago");
    }.bind(this));
  }

  showPagos(){
  	this._pagosService.getPagos()
  	.subscribe(
  		data=>{ this.pagos = data; },
  		error=>alert(error),
  		()=>console.log('done!')
  	);
  }

}
