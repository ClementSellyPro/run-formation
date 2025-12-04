import { PrismaService } from '../prisma/prisma.service';
export declare class FormationsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: string;
        title: string;
        description: string;
        domaine: string;
        duration: number;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        title: string;
        description: string;
        domaine: string;
        duration: number;
        content: string;
    }>;
}
