import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {InscriptionAdmin, InscriptionResponse} from '../models/inscripton.model';

@Injectable({
  providedIn: 'root'
})
export class AdminInscriptionsService {
  private apiUrl = 'http://localhost:3000/inscriptions';

  constructor(private http: HttpClient) { }

  getPendingInscription() {
    return this.http.get<InscriptionAdmin[]>(`${this.apiUrl}/pending`);
  }
}
