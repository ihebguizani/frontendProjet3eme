import { Component } from '@angular/core';
import {LoginService} from "../services/login.service";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  message: string = '';

  constructor(private authService: LoginService, private router: Router,
              private userService:UserService) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        // Enregistrer le token dans le stockage local et rediriger
        sessionStorage.setItem('token', response.token);

        this.router.navigate(['/annonces']);
      },
      error => {
        this.message = error.error.message || 'Erreur de connexion';
      }
    );
  }
  navigateToRegister() {
    this.router.navigate(['/register']); // Assurez-vous que la route d'inscription existe
  }
}
