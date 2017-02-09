import { Injectable } from '@angular/core';

@Injectable()
export class GlobalParamsService {
	
	public readonly notificationOptions = { //Opciones de notificacion
		position: ["top", "right"], timeOut: 4000,
		lastOnBottom: true
	};

	public readonly domain='http://localhost:8000';

  	constructor() { }

}
