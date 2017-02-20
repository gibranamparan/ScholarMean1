import { Injectable } from '@angular/core';
import { Modal } from 'angular2-modal/plugins/bootstrap';

@Injectable()
export class GlobalParamsService {
	
	public readonly notificationOptions = { //Opciones de notificacion
		position: ["top", "right"], timeOut: 4000,
		lastOnBottom: true
	};

	public readonly domain='http://localhost:8000';
	//public readonly domain='https://scholarnode.herokuapp.com';

  	constructor() { }

  	//Prepara una ventana de confirmacion modal
  	//de 2 botones: OK y cancel
  	configConfirmationModal(modal:Modal){
  		return modal.confirm()
	    .size('sm')
	    .isBlocking(true)
	    .showClose(true)
	    .keyboard(27)
	    .title('Borrar')
	    .body('¿Seguro que deseas borrar este registro?')
	    .okBtn('SI')
	    .okBtnClass('btn btn-danger')
	    .cancelBtn('Cancelar');
  	}

}
