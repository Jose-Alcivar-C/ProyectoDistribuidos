import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//mis componentes
import {NoticiasComponent} from "./componentes/noticias/noticias.component";
import {PrincipalComponent} from "./componentes/principal/principal.component";
import {EnadopcionComponent} from "./componentes/enadopcion/enadopcion.component";

const routes: Routes = [
  {
    path:"",
    redirectTo: "/principal",
    pathMatch: "full"
  },
  {
    path: "principal",
    component: PrincipalComponent
  },
  {
    path:"noticias",
    component: NoticiasComponent
  },
  {
    path:"enadopcion",
    component: EnadopcionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
