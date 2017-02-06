import { Component, OnInit } from '@angular/core';
import { Grupo } from './grupo';
import { GrupoService } from './grupo.service';
import { SimpleNotificationsComponent, NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})
export class GrupoComponent implements OnInit {
  constructor(private _grupoService : GrupoService,
    private _notificationsService : NotificationsService){}

  public grupos:Grupo[];
  public notifOptions = { //Opciones de notificacion
    position: ["top", "right"], timeOut: 2000,
    lastOnBottom: true
  }
  io = require("socket.io-client");
  socket = this.io('http://localhost:8000');

  ngOnInit() {
  	this.showCarreras();
    this.socket.on('grupoCreado', function(data){
      this.grupos.push(data);
      this._notificationsService.info("Nuevo","Registro de grupo");
    }.bind(this));
  }

  showCarreras(){
  	this._grupoService.getGrupos()
  	.subscribe(
  		data=>{ this.grupos = data; },
  		error=>alert(error),
  		()=>console.log('done!')
  	);
  }

}
