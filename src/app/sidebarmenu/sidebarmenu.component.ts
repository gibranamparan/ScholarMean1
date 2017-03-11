import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sidebarmenu',
  templateUrl: './sidebarmenu.component.html',
  styleUrls: ['./sidebarmenu.component.css']
})
export class SidebarmenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  	//toma el usuario logeado de local storage
  	//imprimelo con un alert
  }

  estaLogeado(){
  	//Si esta logeado
  	return true;

  	//Si no
  	//return false;
  }

}
