import {Component, OnInit} from '@angular/core';
import {AdminInscriptionsService} from '../../services/admin-inscriptions.service';
import {Observable} from 'rxjs';
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
        console.log(data);
        this.listInscriptions = data;
      }
    })
  }
}
