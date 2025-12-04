import { Injectable } from '@nestjs/common';
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
}
