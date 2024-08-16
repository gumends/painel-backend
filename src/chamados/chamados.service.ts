import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateChamadoDto } from './dto/create-chamado.dto';

@Injectable()
export class ChamadosService {

  constructor(
    private prisma: PrismaService
  ) { }

  async buscarChamadosQuantidade() {
    const chamados = await this.prisma.chamados.count({
      where: {
        status: 0
      }
    });
    if (chamados < 0) {
      throw new ForbiddenException("0 chamados");
    }
    if (!chamados) throw new ForbiddenException('Nenhum chamado encontrado');
    return chamados;
  }

  async cadastroChamados(createChamadoDto: CreateChamadoDto) {
    const chamado = await this.prisma.chamados.create({
      data: createChamadoDto
    });
    if (!chamado) throw new ForbiddenException('Erro ao cadastrar chamado');
    return chamado;
  }

  async buscarChamados() {
    const chamados = await this.prisma.chamados.findMany();
    if (!chamados) throw new ForbiddenException('Nenhum chamado encontrado');
    return chamados;
  }
}
