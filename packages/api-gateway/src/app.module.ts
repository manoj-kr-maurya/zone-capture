import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RUNNER_SERVICE',
        transport: Transport.TCP,
        options: { port: 4001 }
      },
      {
        name: 'ZONE_SERVICE',
        transport: Transport.TCP,
        options: { port: 4002 }
      }
    ])
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
