import { Carrera } from '../carrera/carrera';

export class Alumno{
	constructor(
		public _id?:string,
		public Nombre?:string,
		public ApellidoP?:string,
		public ApellidoM?:string,
		public FechaNac?:string,
		public _carrera?:Carrera,
		public createdAt?:Date
	){}
}