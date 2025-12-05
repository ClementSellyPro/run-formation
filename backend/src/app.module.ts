import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { FormationsModule } from './formations/formations.module';
import { InscriptionsModule } from './inscriptions/inscriptions.module';

@Module({
  imports: [PrismaModule, AuthModule, FormationsModule, InscriptionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
