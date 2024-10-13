import {Component, OnInit} from '@angular/core';
import {Annonce} from "../../model/annonce";
import {ActivatedRoute} from "@angular/router";
import {AnnonceServiceService} from "../../services/annonce-service.service";
import {ImageModalComponent} from "../../image-modal/image-modal.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-annonce-detail',
  templateUrl: './annonce-detail.component.html',
  styleUrl: './annonce-detail.component.css'
})
export class AnnonceDetailComponent implements OnInit {
  annonce!: any;

  constructor(
    private route: ActivatedRoute,
    private annonceService: AnnonceServiceService,
    private dialog: MatDialog
  ) {}

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




}
