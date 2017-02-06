import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Carrera } from './carrera';
import { CarreraService } from './carrera-service.service';
import { SimpleNotificationsComponent, NotificationsService } from 'angular2-notifications';
import { Overlay, OverlayRenderer } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap'
//import * as io from 'socket.io-client';

@Component({
	templateUrl: 'carreraIndex.html'
})
export class CarreraComponent implements OnInit {
  constructor(private _carreraService : CarreraService,
    private _notificationsService : NotificationsService,
    overlay: Overlay, vcRef: ViewContainerRef, public modal:Modal){
      overlay.defaultViewContainer = vcRef;
  }

  public carreras:Carrera[];
  public carreraSelected:Carrera;
  public accionForm='Agregar';
  public notifOptions = { //Opciones de notificacion
    position: ["top", "right"], timeOut: 2000,
    lastOnBottom: true
  }

  io = require("socket.io-client");
  socket = this.io('http://localhost:8000');

  ngOnInit(){
  	this.showCarreras();

    //Evento de deteccion de registro creado
    this.socket.on('carreraCreada', function(data){
      this.carreras.push(data);
      this._notificationsService.info("Nuevo","Registro de carrera");
    }.bind(this));

    //Evento de deteccion de registro elminado
    this.socket.on('carreraEliminada', function(id){
      var carreraBorrada = this.carreras.filter(car=>car._id==id)[0];
      this.carreras.splice(this.carreras.indexOf(carreraBorrada), 1);
      this._notificationsService.info("Eliminado","Registro de carrera");
    }.bind(this));

    //Evento de deteccion de registro editado
    this.socket.on('carreraEditada', function(carrera){
      this.showCarreras();
      this._notificationsService.info("Editado","Registro de carrera");
    }.bind(this));

    
  }

  showCarreras(){
  	this._carreraService.getCarreras()
  	.subscribe(
  		(data:Carrera[])=>{ this.carreras = data; },
  		error=>alert(error),
  		()=>console.log('done!')
  	);
  }

  //Abre modal para confirmacion de eliminacion de registro
  confirmBorrarCarrera(id){
    this.modal.confirm()
    .size('sm')
    .isBlocking(true)
    .showClose(true)
    .keyboard(27)
    .title('Borrar')
    .body('¿Seguro que deseas borrar este registro?')
    .okBtn('SI')
    .okBtnClass('btn btn-danger')
    .cancelBtn('Cancelar')
    .open().then((resultPromise)=>{
      resultPromise.result.then(
          (result)=>{
            if(result)
              this.borrarCarrera(id);
          },()=>{}
        )
    })
  }

  //Prepara la forma de creación para funcionar como una forma de edicion
  confirmEditarCarrera(carrera){
    this.carreraSelected = carrera;
    this.accionForm = 'Editar';
  }

  borrarCarrera(id){
    this._carreraService.deleteCarrera(id)
    .subscribe(
      data=>{ },
      error=>alert(error),
      ()=>console.log('done!')
    );
  }  

  recibirAccion(accion){
    this.accionForm=accion;
    this.carreraSelected = null;
  }
  
}