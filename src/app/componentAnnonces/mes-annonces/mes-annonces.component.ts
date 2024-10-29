import {Component, OnInit} from '@angular/core';
import {Annonce} from "../../model/annonce";
import {AnnonceServiceService} from "../../services/annonce-service.service";
import {UserService} from "../../services/user.service";
import {LoginService} from "../../services/login.service";
import {User} from "../../model/user";

@Component({
  selector: 'app-mes-annonces',
  templateUrl: './mes-annonces.component.html',
  styleUrl: './mes-annonces.component.css'
})
export class MesAnnoncesComponent implements OnInit {

  annonces: Annonce[] = [];
  userConnecte:any;
  user: User = {} as User;
  userId:any;
  constructor(private annonceService: AnnonceServiceService,
              private userService:UserService,
              private authService: LoginService,
              ) { }



  ngOnInit(): void {
    this.userConnecte = this.authService.getAuthenticatedUser();
    console.log("user", this.userConnecte.sub);

    // Assure-toi que getUserByUserName retourne un Observable
    this.userService.getUserByUserName(this.userConnecte.sub).subscribe((user: User) => {
      this.user = user;
      this.userId = this.user.userId;
      console.log(this.user.userId);

      // Récupère les annonces de l'utilisateur
      this.annonceService.getAnnoncesByUserId(this.user.userId).subscribe(data => {
        this.annonces = data;
      });
    });
  }


  public getUserByUserName(username:string){

    let rep=this.userService.getUserByUserName(username);

    rep.subscribe((data: any) => this.user = data);
    console.log('rep',rep);
  }

}
