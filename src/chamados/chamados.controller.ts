import { Controller, Get, Post, Body, Patch, Param, Delete, ForbiddenException } from '@nestjs/common';
import { ChamadosService } from './chamados.service';
import { WebSocketGateway } from '@nestjs/websockets';
import { CreateChamadoDto } from './dto/create-chamado.dto';


@WebSocketGateway({ cors: true })
@Controller('chamados')
export class ChamadosControler {

  constructor(
    private readonly chamadosService: ChamadosService) {}

  @Get('abertos')
  getHello() {
    return this.chamadosService.buscarChamadosQuantidade();
  }

  @Post('cadastrar')
  async cadastroChamados(@Body() createChamadoDto: CreateChamadoDto) {
    const chamado = await this.chamadosService.cadastroChamados(createChamadoDto);
    if (!chamado) throw new ForbiddenException('Erro ao cadastrar chamado');
    return chamado;
  }

  @Get('busca')
  async buscarChamados() {
    const chamados = await this.chamadosService.buscarChamados();
    if (!chamados) throw new ForbiddenException('Nenhum chamado encontrado');
    return chamados;
  }
}
