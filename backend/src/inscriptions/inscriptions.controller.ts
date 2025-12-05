import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { InscriptionsService } from './inscriptions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../auth/user.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('inscriptions')
@UseGuards(JwtAuthGuard)
export class InscriptionsController {
  constructor(private readonly inscriptionsService: InscriptionsService) {}

  // USER : S'inscrire à une formation
  @Post()
  async create(
    @User() user: { id: string; email: string; role: string },
    @Body() body: { formationId: string },
  ) {
    return this.inscriptionsService.create(user.id, body.formationId);
  }

  // USER : Voir ses inscriptions
  @Get('my-inscriptions')
  async getMyInscriptions(
    @User() user: { id: string; email: string; role: string },
  ) {
    return this.inscriptionsService.findByUser(user.id);
  }

  // ADMIN : Voir toutes les inscriptions en attente
  @Get('pending')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  async getPending() {
    return this.inscriptionsService.findPending();
  }
}
