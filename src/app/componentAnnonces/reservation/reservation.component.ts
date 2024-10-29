import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {ReservationService} from "../../services/reservation.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../services/user.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AnnonceServiceService} from "../../services/annonce-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "../../services/login.service";
import {Annonce} from "../../model/annonce";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent implements OnInit{
  reservation: any = {
    dateVisite: '',
    timeVisite: ''
  };
  user:any;
  annonce:any;
  userConnecte:any;
  annonceId:any;


  constructor(
    public dialogRef: MatDialogRef<ReservationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { annonceId: number },
    private reservationService: ReservationService,
    private userService:UserService,
    private fb: FormBuilder,
    private annonceService: AnnonceServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private auth:LoginService,
  ) {this.annonceId = data.annonceId;}
  ngOnInit(): void {

    this.annonceService.getAnnonceById(this.annonceId).subscribe((data: Annonce) => {
      this.annonce = data;
      this.annonce.photos=null;
    });
    this.userConnecte = this.auth.getAuthenticatedUser();
    console.log(this.userConnecte);
    console.log(this.userConnecte.sub)
    this.getUserByUserName(this.userConnecte.sub);
  }





  onSubmit(): void {
    const reservationData = {
      reservation: {
        dateVisite: this.reservation.dateVisite + 'T' + this.reservation.timeVisite
        // Include other reservation fields as necessary
      },
      user: this.user, // Replace with the connected user
      annonce: this.annonce
    };
    console.log(this.annonce);

    // Appel à la méthode createReservation du service
    this.reservationService.createReservation(reservationData).subscribe(
      (response) => {
        console.log('Réservation réussie', response);
        this.dialogRef.close(response); // Ferme le modal après succès
      },
      (error) => {
        console.error('Erreur lors de la réservation', error);
        // Gérer l'erreur si nécessaire
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close(); // Ferme simplement le modal
  }
  public getUserByUserName(username: string) {

    let rep = this.userService.getUserByUserName(username);

    rep.subscribe((data: any) => this.user = data);
    console.log(rep);
  }
}
