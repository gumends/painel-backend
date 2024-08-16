import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppGateway } from './chamados/app.gateway';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';
import { ChamadosModule } from './chamados/chamados.module';

@Module({
  imports: [ PrismaModule, ChamadosModule ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
