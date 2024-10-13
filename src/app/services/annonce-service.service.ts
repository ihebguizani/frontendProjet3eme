import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Annonce} from "../model/annonce";

@Injectable({
  providedIn: 'root'
})
export class AnnonceServiceService {

  private apiUrl = 'http://localhost:8004/api/annonces';

  constructor(private http: HttpClient) {}

  getAnnonces(): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(`${this.apiUrl}/getAll`);
  }

  getAnnonceById(id: number): Observable<Annonce> {
    return this.http.get<Annonce>(`${this.apiUrl}/get/${id}`);
  }

  // Créer une nouvelle annonce avec images
  createAnnonce(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, formData);
  }

  // Mettre à jour une annonce existante avec images
  updateAnnonce(id: string, formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, formData);
  }

  deleteAnnonce(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  searchAnnonces(type?: string, localisation?: string, minPrix?: number, maxPrix?: number): Observable<any[]> {
    let params = new HttpParams();
    if (type) params = params.set('type', type);
    if (localisation) params = params.set('localisation', localisation);
    if (minPrix) params = params.set('minPrix', minPrix.toString());
    if (maxPrix) params = params.set('maxPrix', maxPrix.toString());

    return this.http.get<any[]>(`${this.apiUrl}/search`, { params });
  }
}
