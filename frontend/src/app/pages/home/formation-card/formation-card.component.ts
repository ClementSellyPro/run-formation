import {Component, Input} from '@angular/core';
import {Formation} from '../../../models/formation.model';
import {UpperCasePipe} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-formation-card',
  imports: [
    UpperCasePipe
  ],
  templateUrl: './formation-card.component.html',
  styleUrl: './formation-card.component.css'
})
export class FormationCardComponent {
  @Input() formationData!:  Formation;

  constructor(private router: Router) {}

  changePage(id: string) {
    this.router.navigate([`formation/${id}`])
  }
}
