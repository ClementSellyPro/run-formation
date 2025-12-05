import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {InscriptionAdmin, InscriptionResponse} from '../models/inscripton.model';

@Injectable({
  providedIn: 'root'
})
export class AdminInscriptionsService {
  private apiUrl = 'http://localhost:3000/inscriptions';

  constructor(private http: HttpClient) { }

  // ADMIN : Voir toutes les inscriptions en attente
  getPendingInscription() {
    return this.http.get<InscriptionAdmin[]>(`${this.apiUrl}/pending`);
  }

  // ADMIN : Approuver une inscription
  approveInscription(inscriptionId: string) {
    return this.http.patch<InscriptionResponse>(`${this.apiUrl}/${inscriptionId}/approve`, {});
  }

  // ADMIN : Rejeter une inscription
  rejectInscription(inscriptionId: string) {
    return this.http.patch<InscriptionResponse>(`${this.apiUrl}/${inscriptionId}/reject`, {});
  }
}
