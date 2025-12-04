import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Formation} from '../models/formation.model';

@Injectable({
  providedIn: 'root'
})
export class FormationsService {
  private apiUrl = 'http://localhost:3000/formations';

  constructor(private http: HttpClient) { }

  getFormations(): Observable<Formation[]> {
    return this.http.get<Formation[]>(`${this.apiUrl}`);
  }

  getFormation(id: string): Observable<Formation> {
    return this.http.get<Formation>(`${this.apiUrl}/${id}`);
  }
}
