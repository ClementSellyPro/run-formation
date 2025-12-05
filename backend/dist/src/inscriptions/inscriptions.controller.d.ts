import { InscriptionsService } from './inscriptions.service';
export declare class InscriptionsController {
    private readonly inscriptionsService;
    constructor(inscriptionsService: InscriptionsService);
    create(user: {
        id: string;
        email: string;
        role: string;
    }, body: {
        formationId: string;
    }): Promise<{
        formation: {
            id: string;
            title: string;
            description: string;
            domaine: string;
            duration: number;
            content: string;
        };
    } & {
        id: string;
        status: import("@prisma/client").$Enums.InscriptionStatus;
        userId: string;
        formationId: string;
    }>;
    getMyInscriptions(user: {
        id: string;
        email: string;
        role: string;
    }): Promise<({
        formation: {
            id: string;
            title: string;
            description: string;
            domaine: string;
            duration: number;
        };
    } & {
        id: string;
        status: import("@prisma/client").$Enums.InscriptionStatus;
        userId: string;
        formationId: string;
    })[]>;
    getPending(): Promise<({
        user: {
            id: string;
            email: string;
        };
        formation: {
            id: string;
            title: string;
            domaine: string;
        };
    } & {
        id: string;
        status: import("@prisma/client").$Enums.InscriptionStatus;
        userId: string;
        formationId: string;
    })[]>;
    approve(id: string): Promise<{
        id: string;
        status: import("@prisma/client").$Enums.InscriptionStatus;
        userId: string;
        formationId: string;
    }>;
}
