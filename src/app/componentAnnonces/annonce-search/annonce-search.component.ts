import {Component, OnInit} from '@angular/core';
import {AnnonceServiceService} from "../../services/annonce-service.service";

@Component({
  selector: 'app-annonce-search',
  templateUrl: './annonce-search.component.html',
  styleUrl: './annonce-search.component.css'
})
export class AnnonceSearchComponent implements OnInit {
  annonces: any[] = [];
  type: string = '';
  localisation: string = '';
  minPrix: number | undefined;
  maxPrix: number | undefined;

  constructor(private annonceService: AnnonceServiceService) {
  }

  ngOnInit(): void {
  }

  searchAnnonces(): void {
    this.annonceService.searchAnnonces(this.type, this.localisation, this.minPrix, this.maxPrix).subscribe(data => {
      this.annonces = data;
    });
  }
}
