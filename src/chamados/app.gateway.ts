import { Server, Socket } from 'socket.io';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { json } from 'stream/consumers';
import { ChamadosService } from './chamados.service';
interface Chamados {
  quatidade: number;
}
@WebSocketGateway({ cors: true })
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(
    private chamadosService: ChamadosService
  ) { }

  async buscarTudo(): Promise<any> {
    try {
      const response = await fetch('http://localhost:3000/chamados/abertos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 401) {
        throw new Error('Unauthorized');
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
  
  @SubscribeMessage('chamados')
  async handleMessage(client: Socket): Promise<void> {
    try {
      const data = await this.chamadosService.buscarChamadosQuantidade();
      this.server.emit('chamados', data);
    } catch (error) {
      console.error('Error handling message:', error);
    }
  }

  afterInit(server: Server) {
    // this.logger.log('Init');
  }

  handleConnection(client: Socket) {
    // Handle connection logic here
  }

  handleDisconnect(client: Socket) {
    // Handle disconnect logic here
  }
}