import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumnoRoutingModule } from './alumno-routing.module';
import { AlumnoComponent } from './alumno.component';
import { AlumnoCreateComponent } from './alumno-create/alumno-create.component';
import { SimpleNotificationsModule, NotificationsService} from 'angular2-notifications';
import { AlumnoService } from './alumno.service';
import { FormsModule } from '@angular/forms';
import { CarreraService } from '../carrera/carrera-service.service';

@NgModule({
  imports: [
    CommonModule,
    AlumnoRoutingModule,
    SimpleNotificationsModule,
    FormsModule
  ],
  declarations: [AlumnoComponent, AlumnoCreateComponent],
  providers: [AlumnoService, CarreraService]
})
export class AlumnoModule { }
