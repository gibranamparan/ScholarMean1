import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagosRoutingModule } from './pagos-routing.module';
import { PagosComponent } from './pagos.component';
import { PagosService } from './pagos.service';
import { SimpleNotificationsModule, NotificationsService} from 'angular2-notifications';
import { FormsModule } from '@angular/forms';
//import { PagosComponent } from './pagos/pagos.component';
import { PagosCreateComponent } from './pagos-create/pagos-create.component';
//import { SimpleListComponent } from './simple-list/simple-list.component';


@NgModule({
  imports: [
    CommonModule,
    PagosRoutingModule,
    SimpleNotificationsModule,FormsModule
  ],
  declarations: [PagosComponent, PagosComponent, PagosCreateComponent],
  providers: [PagosService, NotificationsService],
})
export class PagosModule { }
