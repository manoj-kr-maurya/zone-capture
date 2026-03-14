import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: { port: 4002 }
  })

  await app.listen()
  console.log('Zone service listening on port 4002')
}

bootstrap().catch((err) => {
  console.error('Zone service failed to start', err)
  process.exit(1)
})
