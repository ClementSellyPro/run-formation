import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Inscription, InscriptionResponse} from '../models/inscripton.model';
import {Observable, tap} from 'rxjs';
import {Formation} from '../models/formation.model';

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
  getMyInscriptions(): Observable<InscriptionResponse[]> {
    return this.http.get<InscriptionResponse[]>(`${this.apiUrl}/my-inscriptions`);
  }

  // USER : Accéder au contenu d'une formation (si approuvé) ✅
  getFormationContent(formationId: string): Observable<Formation> {
    return this.http.get<Formation>(`${this.apiUrl}/${formationId}/content`);
  }
}
