import { PrismaService } from '../prisma/prisma.service';
export declare class InscriptionsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, formationId: string): Promise<{
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
    findByUser(userId: string): Promise<({
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
}
