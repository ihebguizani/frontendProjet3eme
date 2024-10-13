import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AnnonceServiceService} from "../../services/annonce-service.service";


@Component({
  selector: 'app-annonce-form',
  templateUrl: './annonce-form.component.html',
  styleUrl: './annonce-form.component.css'
})
export class AnnonceFormComponent implements OnInit {
  annonceForm: FormGroup;
  isEditMode: boolean = false;
  annonceId: any | null = null;
  selectedFiles: File[] = []; // Pour stocker les fichiers sélectionnés

  constructor(
    private fb: FormBuilder,
    private annonceService: AnnonceServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Initialisation du formulaire
    this.annonceForm = this.fb.group({
      titre: ['', [Validators.required]],
      description: ['', [Validators.required]],
      prix: [0, [Validators.required, Validators.min(0)]],
      localisation: ['', [Validators.required]],
      type: ['VENTE', [Validators.required]], // Valeur par défaut : VENTE
      //datePublication:[]
    });
  }

  ngOnInit(): void {
    // Vérifie si nous sommes en mode d'édition en fonction de l'ID de l'annonce dans l'URL
    this.annonceId = this.route.snapshot.paramMap.get('id');
    if (this.annonceId) {
      this.isEditMode = true;
      this.loadAnnonce(this.annonceId);
    }
  }

  // Gestion du changement de fichier
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFiles = Array.from(event.target.files);
    }
  }

  // Chargement des données d'une annonce existante en mode édition
  loadAnnonce(id: number) {
    this.annonceService.getAnnonceById(id).subscribe(annonce => {
      this.annonceForm.patchValue({
        titre: annonce.titre,
        description: annonce.description,
        prix: annonce.prix,
        localisation: annonce.localisation,
        type: annonce.type
      });
    });
  }

  // Gestion de la soumission du formulaire
  onSubmit() {
    if (this.annonceForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('annonce', JSON.stringify(this.annonceForm.value));

    // Ajouter les fichiers d'image au formData
    this.selectedFiles.forEach(file => {
      formData.append('photos', file);
    });

    if (this.isEditMode) {
      this.annonceService.updateAnnonce(this.annonceId!, formData).subscribe(() => {
        this.router.navigate(['/annonces']);
      });
    } else {
      this.annonceService.createAnnonce(formData).subscribe(() => {
        console.log(formData);
        this.router.navigate(['/annonces']);
      });
    }
  }
}
