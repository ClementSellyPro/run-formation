import { FormationsService } from './formations.service';
export declare class FormationsController {
    private readonly formationsService;
    constructor(formationsService: FormationsService);
    getAll(): Promise<{
        id: string;
        title: string;
        description: string;
        domaine: string;
        duration: number;
    }[]>;
}
