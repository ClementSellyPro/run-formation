import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Inscription} from '../models/inscripton.model';
import {Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscriptionsService {
  private apiUrl = 'http://localhost:3000/inscriptions';

  constructor(private http: HttpClient) { }

  // USER : S'inscrire à une formation
  createInscription(formationId: string): Observable<Inscription> {
    return this.http.post<Inscription>(`${this.apiUrl}`, {formationId}).pipe(
      tap(() => console.log("reponse back recu"))
    );
  }

  // USER : Voir ses inscriptions
  getMyInscriptions(): Observable<Inscription[]> {
    return this.http.get<Inscription[]>(`${this.apiUrl}/my-inscriptions`);
  }
}
