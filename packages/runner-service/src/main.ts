import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: { port: 4001 }
  })

  await app.listen()
  console.log('Runner service listening on port 4001')
}

bootstrap().catch((err) => {
  console.error('Runner service failed to start', err)
  process.exit(1)
})
