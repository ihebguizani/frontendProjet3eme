import {Component, OnInit} from '@angular/core';
import {AnnonceServiceService} from "../../services/annonce-service.service";
import {Annonce} from "../../model/annonce";

@Component({
  selector: 'app-annonce-list',
  templateUrl: './annonce-list.component.html',
  styleUrl: './annonce-list.component.css'
})
export class AnnonceListComponent implements OnInit {
  annonces: Annonce[] = [];
  filteredAnnonces: any[] = [];
  searchTerm: string = '';

  constructor(private annonceService: AnnonceServiceService) {}

  ngOnInit(): void {
    this.getAnnonces();
  }

  getAnnonces(): void {
    this.annonceService.getAnnonces().subscribe((data: any[]) => {
      this.annonces = data;
      this.filteredAnnonces = data;  // Par défaut, toutes les annonces sont affichées
    });
  }

  searchAnnonces(): void {
    if (this.searchTerm.trim()) {
      this.filteredAnnonces = this.annonces.filter(annonce =>
        annonce.titre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        annonce.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        annonce.localisation.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredAnnonces = this.annonces;  // Réinitialiser la liste si le champ de recherche est vide
    }
  }
  getPhotoUrl(photoName: string): string {
    return `http://localhost:8004/resources/${photoName}`;
  }


}
