import {Formation} from './formation.model';

export interface Inscription {
  id: number;
  email: string;
  role: string;
}

export interface InscriptionResponse {
  id: number;
  formation: Formation;
  formationId: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  userId: string;
}

export interface InscriptionAdmin {
  id: number;
  formationId: string;
  status: "PENDING";
  userId: string;
  user: {
    id: string;
    email: string;
  };
  formation: {
    id: string;
    title: string;
    domaines: string;
  }
}
