import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { FormationsService } from './formations.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('formations')
@UseGuards(JwtAuthGuard)
export class FormationsController {
  constructor(private readonly formationsService: FormationsService) {}

  @Get()
  async getAll() {
    return this.formationsService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.formationsService.findOne(id);
  }
}
