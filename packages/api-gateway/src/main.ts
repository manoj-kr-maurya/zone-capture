import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Example: expose the API gateway on port 3000
  await app.listen(3000)
  console.log('API Gateway running on http://localhost:3000')
}

bootstrap().catch((err) => {
  console.error('Failed to start API gateway', err)
  process.exit(1)
})
