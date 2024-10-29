import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AnnonceServiceService} from "../../services/annonce-service.service";
import {LoginService} from "../../services/login.service";
import {UserService} from "../../services/user.service";


@Component({
  selector: 'app-annonce-form',
  templateUrl: './annonce-form.component.html',
  styleUrl: './annonce-form.component.css'
})
export class AnnonceFormComponent implements OnInit {
  annonceForm: FormGroup;
  user:any;
  userConnecte:any;
  isEditMode: boolean = false;
  annonceId: any | null = null;
  selectedFiles: File[] = []; // Pour stocker les fichiers sélectionnés

  constructor(
    private fb: FormBuilder,
    private annonceService: AnnonceServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private auth:LoginService,
    private userService:UserService
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
    this.userConnecte = this.auth.getAuthenticatedUser();
    console.log(this.userConnecte);
    console.log(this.userConnecte.sub)
    this.getUserByUserName(this.userConnecte.sub);
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
    // Récupérer l'utilisateur connecté à partir de sessionStorage (ou un autre service)
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(this.user);

    // Ajouter l'objet utilisateur au formData
    formData.append('user', JSON.stringify(this.user));

    if (this.isEditMode) {
      this.annonceService.updateAnnonce(this.annonceId!, formData).subscribe(() => {
        this.router.navigate(['/annonces']);
      });
    }  else {
      this.annonceService.createAnnonce(formData).subscribe({
        next: () => {
          console.log("Annonce created successfully");
          this.router.navigate(['/annonces']);
        },
        error: (err) => {
          console.error('Error creating annonce:', err);
          // Handle the error as needed
        }
      });
    }
  }
  public getUserByUserName(username: string) {

    let rep = this.userService.getUserByUserName(username);

    rep.subscribe((data: any) => this.user = data);
    console.log(rep);
  }
}
