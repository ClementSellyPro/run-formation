import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FormationsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.formation.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        domaine: true,
        duration: true,
      },
    });
  }

  async findOne(id: string) {
    const formation = await this.prisma.formation.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        domaine: true,
        duration: true,
      },
    });

    if (!formation) {
      throw new NotFoundException('Formation introuvable');
    }

    return formation;
  }
}
