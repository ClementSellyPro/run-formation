import {Formation} from './formation.model';

export interface Inscription {
  id: number;
  email: string;
  role: string;
}

export interface InscriptionResponse {
  formation: Formation;
  formationId: string;
  id: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
  userId: string;
}
