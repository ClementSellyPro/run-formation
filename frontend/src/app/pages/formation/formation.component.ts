import {Component, OnInit} from '@angular/core';
import {Formation} from '../../models/formation.model';
import {FormationsService} from '../../services/formations.service';
import {ActivatedRoute, RouterLink} from '@angular/router';

@Component({
  selector: 'app-formation',
  imports: [
    RouterLink
  ],
  templateUrl: './formation.component.html',
  styleUrl: './formation.component.css'
})
export class FormationComponent implements OnInit {
  formationId!: string | null;
  formationData!: Formation;
  loading = false;

  constructor(private formationsService: FormationsService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.formationId = this.route.snapshot.paramMap.get('id');
    if(this.formationId === null) return;

    this.loadFormation(this.formationId);
  }

  loadFormation(id: string) {
    this.loading = true;

    this.formationsService.getFormation(id).subscribe({
      next: (data) => {
        this.formationData = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur:', err);
        this.loading = false;
      }
    });
  }
}
