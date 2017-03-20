import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../userLogin';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../usuario-service.service';
import { GlobalParamsService } from '../../global-params.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	userLogin:UserLogin = new UserLogin();
	 returnUrl: string;

	constructor(
		private _usuarioService:UsuarioService,
		private _globalEventsManager: GlobalParamsService,
		private router: Router,
	) { }

	ngOnInit() {
	}

	autenticar(){

		this._usuarioService.autenticar(this.userLogin)
		.subscribe(
			(data:UserLogin)=>{
				localStorage.setItem('currentUser',JSON.stringify(data));

				if(data._id){
					if(data.rol=='admin'){
						this.returnUrl = 'carrera';
					}else if(data.rol=='alumno'){
						this.returnUrl = 'AlumnoDetails';
						
					}else if(data.rol=='finanzas'){
						this.returnUrl = 'pagosList';
					}
					
					this._globalEventsManager.showNavBar(true);
					this.router.navigate([this.returnUrl]);
				}else{
					this._globalEventsManager.showNavBar(false);
				}
			},
			error=>{
				console.log(error);
			}
		)
	}

}
