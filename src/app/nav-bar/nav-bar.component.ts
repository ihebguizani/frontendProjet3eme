import {Component, OnInit} from '@angular/core';
import {LoginService} from "../services/login.service";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {User} from "../model/user";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit{
  userConnecte:any;
  user:any;

  constructor(private authService: LoginService,
              private userService:UserService,
              private router:Router) { }

  ngOnInit() {
    this.userConnecte = this.authService.getAuthenticatedUser();
    console.log(this.userConnecte);
    this.userService.getUserByUserName(this.userConnecte.sub).subscribe((user: User) => {
      this.user = user;
  });
  }
  public getUserByUserName(username:string){

    let rep=this.userService.getUserByUserName(username);

    rep.subscribe((data: any) => this.user = data);
    console.log(rep);
  }
  logout(): void {
    this.authService.logout(); // Appelle la méthode de déconnexion dans ton service d'authentification
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }
  checkSessionData(): boolean {
    // Récupérer les données de session
    const sessionData = sessionStorage.getItem('token');

    // Retourner true si les données de session existent, sinon false
    return sessionData !== null;

  }

  login() {
    this.router.navigateByUrl('/login');
  }
}
