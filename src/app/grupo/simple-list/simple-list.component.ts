import { Component, OnInit, Input } from '@angular/core';
import { Grupo } from '../grupo';
import { GrupoService } from '../grupo.service';

@Component({
  selector: 'grupo-simple-list',
  templateUrl: './simple-list.component.html',
  styleUrls: ['./simple-list.component.css']
})
export class SimpleListComponent implements OnInit {
	@Input() grupoID:string;
	grupo:Grupo = new Grupo();

	constructor(private _grupoService:GrupoService) {}

	ngOnInit() {
		if(this.grupoID){
			this._grupoService.getGrupo(this.grupoID)
			.subscribe(
	  		(data)=>{
		        console.log('data: ')
		        console.log(JSON.stringify(data))
		        this.grupo = data;
	      	},
		  		error=>alert(error),
		  		()=>console.log('done!')
		  	);
		}
		console.log('grupo:'+JSON.stringify(this.grupo));
	}
}
