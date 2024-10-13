import { Component } from '@angular/core';
import {LoginService} from "../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user = {
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    role:'USER'
  };
  message: string = '';

  constructor(private authService: LoginService, private router: Router) {}

  register() {
    this.authService.register(this.user).subscribe(
      response => {
        this.message = 'Inscription réussie ! Vous pouvez maintenant vous connecter.';
        setTimeout(() => {
          this.router.navigate(['/login']); // Redirection vers la page de connexion après un court délai
        }, 2000);
      },
      error => {
        this.message = 'Erreur lors de l\'inscription : ' + error.error.message;
      }
    );
  }
}
