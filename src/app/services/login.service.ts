import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private userSubject = new BehaviorSubject<any>(null);
  private isLoggedIn = false;
  private jwtHelper: JwtHelperService = new JwtHelperService();
  private baseUrl = 'http://localhost:8004/api';

  constructor(private http: HttpClient) {
  }


  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, {username, password});
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/add`, user); // Appel à l'API pour ajouter un utilisateur
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }


  islogin() {
    this.isLoggedIn = true;
  }


  logout() {
    this.isLoggedIn = false;
  }

  getAuthenticatedUser(): any {
    const token = sessionStorage.getItem('token');

    if (token) {
      console.log('Token:', token); // Vérifie si le token est présent
      const isExpired = this.jwtHelper.isTokenExpired(token);
      console.log('Token Expired:', isExpired); // Vérifie si le token est expiré

      if (!isExpired) {
        const decodedToken = this.jwtHelper.decodeToken(token);
        console.log('Decoded Token:', decodedToken); // Vérifie le contenu du token
        return decodedToken;
      } else {
        console.error('Token has expired');
      }
    } else {
      console.error('Token not found');
    }

    return null;
  }

  setUserFromToken(token: string) {
    const decodedToken: any = this.jwtHelper.decodeToken(token);
    console.log(decodedToken);
    const user = {
      id: decodedToken.sub,
      username: decodedToken.username,
      email: decodedToken.email,
      roles: decodedToken.roles
    };

    this.userSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));


  }
}
