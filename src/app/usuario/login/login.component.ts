import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../userLogin';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../usuario-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	userLogin:UserLogin = new UserLogin();

	constructor(private _usuarioService:UsuarioService) { }

	ngOnInit() {
	}

	autenticar(){
		this._usuarioService.autenticar(this.userLogin)
		.subscribe(
			(data:UserLogin)=>{
				alert(JSON.stringify(data));
				if(data._id){
					alert("LOGEADO!");
					//Guarda el usuario logeado en localStorage

				}else{
					alert("Nel no entras");
				}
			},
			error=>{
				console.log(error);
			}
		)
	}

}
