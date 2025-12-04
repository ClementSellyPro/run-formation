import {Component, OnInit} from '@angular/core';
import {FormationCardComponent} from './formation-card/formation-card.component';
import {FormationsService} from '../../services/formations.service';
import {Formation} from '../../models/formation.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [FormationCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  listFormations: Formation[] = [];
  loading = false;

  constructor(private formationsService: FormationsService) {}

  ngOnInit() {
    this.loadFormations();
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
}
