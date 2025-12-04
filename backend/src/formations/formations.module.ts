import { Module } from '@nestjs/common';
import { FormationsController } from './formations.controller';
import { FormationsService } from './formations.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FormationsController],
  providers: [FormationsService],
})
export class FormationsModule {}
