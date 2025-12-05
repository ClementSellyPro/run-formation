import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InscriptionsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, formationId: string) {
    // Vérifier si déjà inscrit
    const existing = await this.prisma.inscription.findUnique({
      where: {
        userId_formationId: { userId, formationId },
      },
    });

    if (existing) {
      throw new ConflictException('Vous êtes déjà inscrit à cette formation');
    }

    return this.prisma.inscription.create({
      data: { userId, formationId },
      include: {
        formation: {
          select: {
            id: true,
            title: true,
            description: true,
            domaine: true,
            duration: true,
            content: true,
          },
        },
      },
    });
  }

  async findByUser(userId: string) {
    return this.prisma.inscription.findMany({
      where: { userId },
      include: {
        formation: {
          select: {
            id: true,
            title: true,
            description: true,
            domaine: true,
            duration: true,
          },
        },
      },
      orderBy: { status: 'asc' },
    });
  }

  async findPending() {
    return this.prisma.inscription.findMany({
      where: { status: 'PENDING' },
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
        formation: {
          select: {
            id: true,
            title: true,
            domaine: true,
          },
        },
      },
      orderBy: { id: 'desc' },
    });
  }
}
