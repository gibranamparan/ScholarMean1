import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CarreraModule } from './carrera/carrera.module';
import { GrupoModule } from './grupo/grupo.module';
import { AlumnoModule } from './alumno/alumno.module';

const routes: Routes = [];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AlumnoModule,
    BrowserModule,
    CarreraModule,
    FormsModule,
    GrupoModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
