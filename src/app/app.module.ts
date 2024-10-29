import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnnonceListComponent } from './componentAnnonces/annonce-list/annonce-list.component';
import { AnnonceFormComponent } from './componentAnnonces/annonce-form/annonce-form.component';
import { AnnonceDetailComponent } from './componentAnnonces/annonce-detail/annonce-detail.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {NgOptimizedImage} from "@angular/common";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ImageModalComponent } from './image-modal/image-modal.component';
import {MatIcon} from "@angular/material/icon";
import { AnnonceSearchComponent } from './componentAnnonces/annonce-search/annonce-search.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MesAnnoncesComponent } from './componentAnnonces/mes-annonces/mes-annonces.component';
import { ReservationComponent } from './componentAnnonces/reservation/reservation.component';
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    AppComponent,
    AnnonceListComponent,
    AnnonceFormComponent,
    AnnonceDetailComponent,
    LoginComponent,
    RegisterComponent,
    ImageModalComponent,
    AnnonceSearchComponent,
    NavBarComponent,
    MesAnnoncesComponent,
    ReservationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgOptimizedImage,
    MatIcon,
    MatDialogModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
