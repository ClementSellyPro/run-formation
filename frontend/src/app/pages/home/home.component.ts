import {Component, OnInit} from '@angular/core';
import {FormationCardComponent} from './formation-card/formation-card.component';
import {FormationsService} from '../../services/formations.service';
import {Formation} from '../../models/formation.model';
import {InscriptionsService} from '../../services/inscriptions.service';
import {InscriptionResponse} from '../../models/inscripton.model';

@Component({
  selector: 'app-home',
  imports: [FormationCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  listFormations: Formation[] = [];
  listInscriptionsId: (string | null)[] = [];
  loading = false;

  constructor(private formationsService: FormationsService, private inscriptionsService: InscriptionsService) {}

  ngOnInit() {
    this.loadFormations();
    this.loadInscriptions();
  }

  loadFormations() {
    this.loading = true;

    this.formationsService.getFormations().subscribe({
      next: (data) => {
        this.listFormations = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur:', err);
        this.loading = false;
      }
    });
  }

  loadInscriptions() {
    this.inscriptionsService.getMyInscriptions().subscribe({
      next: (data) => {
        this.listInscriptionsId = data.map((data) => {
          if (data.status === "APPROVED") {
            return data.formationId
          }
          return null;
        });
      }
    })
  }
}
