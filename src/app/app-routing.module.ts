import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AnnonceDetailComponent} from "./componentAnnonces/annonce-detail/annonce-detail.component";
import {AnnonceFormComponent} from "./componentAnnonces/annonce-form/annonce-form.component";
import {AnnonceListComponent} from "./componentAnnonces/annonce-list/annonce-list.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AnnonceSearchComponent} from "./componentAnnonces/annonce-search/annonce-search.component";
import {MesAnnoncesComponent} from "./componentAnnonces/mes-annonces/mes-annonces.component";

const routes: Routes = [
  { path: 'annonces', component: AnnonceListComponent },
  { path: 'annonces/create', component: AnnonceFormComponent },
  { path: 'annonces/:id', component: AnnonceDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'search-annonces', component: AnnonceSearchComponent },
  { path:'mesAnnonces',component:MesAnnoncesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
