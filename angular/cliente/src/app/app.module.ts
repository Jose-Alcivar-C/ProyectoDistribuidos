import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoticiasComponent } from './componentes/noticias/noticias.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { EnadopcionComponent } from './componentes/enadopcion/enadopcion.component';

@NgModule({
  declarations: [
    AppComponent,
    NoticiasComponent,
    PrincipalComponent,
    EnadopcionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
