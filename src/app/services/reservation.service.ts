import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = 'http://localhost:8004/api/reservations';

  constructor(private http: HttpClient) { }

  createReservation(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, null, {
      params: {
        reservation: JSON.stringify(data.reservation),
        user: JSON.stringify(data.user),
        annonce: JSON.stringify(data.annonce)
      }
    });
  }

  getReservationsByAnnonce(annonceId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/annonce/${annonceId}`);
  }

  deleteReservation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
