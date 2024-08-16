import { Module } from '@nestjs/common';
import { ChamadosService } from './chamados.service';
import { ChamadosControler } from './chamados.controller';

@Module({
  controllers: [ChamadosControler],
  providers: [ChamadosService],
  exports: [ChamadosService]
})
export class ChamadosModule {}
