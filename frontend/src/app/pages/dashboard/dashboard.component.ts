import {Component, OnInit} from '@angular/core';
import {AdminInscriptionsService} from '../../services/admin-inscriptions.service';
import {InscriptionAdmin} from '../../models/inscripton.model';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  listInscriptions!: InscriptionAdmin[];

  constructor(private adminInscriptionsService: AdminInscriptionsService) {}

  ngOnInit(): void {
    this.loadInscription();
  }

  loadInscription(){
    this.adminInscriptionsService.getPendingInscription().subscribe({
      next: (data: any) => {
        this.listInscriptions = data;
      }
    })
  }

  approveInscription(inscriptionId: number) {
    const id = inscriptionId.toString();
    this.adminInscriptionsService.approveInscription(id).subscribe({
      next: () => {
        this.loadInscription();
      }
    });
  }
}
