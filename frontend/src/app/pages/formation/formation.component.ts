import {Component, OnInit} from '@angular/core';
import {Formation} from '../../models/formation.model';
import {FormationsService} from '../../services/formations.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {InscriptionsService} from '../../services/inscriptions.service';
import {InscriptionResponse} from '../../models/inscripton.model';

enum InscriptionStatus {
  NONE = 'NONE',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED'
}

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
  formationData: Formation | null = null;
  formationContent!: string;
  loading = false;
  myInscriptions: InscriptionResponse[] = [];
  inscriptionStatus: InscriptionStatus = InscriptionStatus.NONE;

  constructor(
    private formationsService: FormationsService,
    private inscriptionsService: InscriptionsService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.formationId = this.route.snapshot.paramMap.get('id');
    if(this.formationId === null) return;

    this.loadFormation(this.formationId);
    this.loadInscriptions();
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

  loadInscriptions() {
    this.inscriptionsService.getMyInscriptions().subscribe({
      next: (data: InscriptionResponse[]) => {
        this.myInscriptions = data;

        const currentFormation = data.find(
          formation => formation.formationId === this.formationId
        );

        if (!currentFormation) {
          this.inscriptionStatus = InscriptionStatus.NONE;
          return;
        }

        if (currentFormation.status === 'PENDING') {
          this.inscriptionStatus = InscriptionStatus.PENDING;
        }
        else if (currentFormation.status === 'APPROVED') {
          this.inscriptionStatus = InscriptionStatus.APPROVED;
          this.loadFormationContent(currentFormation.formationId);
        }
      },
      error: error => console.error(error)
    })
  }

  inscriptionFormation(formationId: string) {
    if( this.inscriptionStatus === InscriptionStatus.PENDING ) return

    this.inscriptionsService.createInscription(formationId).subscribe({
      next: () => {
        this.inscriptionStatus = InscriptionStatus.PENDING;
        this.loadInscriptions();
      },
      error: error => console.error(error)
    });
  }

  loadFormationContent(id: string) {
    this.inscriptionsService.getFormationContent(id).subscribe({
       next: (data) => {
         if (data.content) {
           this.formationContent = data.content;
         }
       }
    })
  }
}
