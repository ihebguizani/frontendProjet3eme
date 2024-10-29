import {Component, OnInit} from '@angular/core';
import {Annonce} from "../../model/annonce";
import {ActivatedRoute} from "@angular/router";
import {AnnonceServiceService} from "../../services/annonce-service.service";
import {ImageModalComponent} from "../../image-modal/image-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {ReservationComponent} from "../reservation/reservation.component";

@Component({
  selector: 'app-annonce-detail',
  templateUrl: './annonce-detail.component.html',
  styleUrl: './annonce-detail.component.css'
})
export class AnnonceDetailComponent implements OnInit {
  annonce!: any;
  showModal: boolean = false;
  annonceId: number;

  constructor(
    private route: ActivatedRoute,
    private annonceService: AnnonceServiceService,
    private dialog: MatDialog
  ) {this.annonceId = +this.route.snapshot.paramMap.get('id')!;}

  ngOnInit(): void {
    const id = +(this.route.snapshot.paramMap.get('id') ?? 0);
    this.annonceService.getAnnonceById(id).subscribe((data: Annonce) => {
      this.annonce = data;
    });
  }
  getPhotoUrl(photo: string): string {
    return `http://localhost:8004/resources/${photo}`;
  }
  openImageModal(photoIndex: number): void {
    this.dialog.open(ImageModalComponent, {
      data: {
        photos: this.annonce.photos,
        selectedIndex: photoIndex
      },
      panelClass: 'popup-dialog'  // Ajoute une classe spécifique si besoin
    });
  }
  reserveAnnonce(annonceId:number): void {
    const dialogRef = this.dialog.open(ReservationComponent, {
      width: '300px',
      data: { annonceId: this.annonceId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Réservation confirmée', result);
        // Logique supplémentaire pour gérer la réservation après fermeture du modal
      } else {
        console.log('Réservation annulée');
      }
    });
  }




}
