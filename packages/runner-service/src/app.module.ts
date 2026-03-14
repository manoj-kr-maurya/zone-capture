import { Module } from '@nestjs/common'
import { RunnerModule } from './runner/runner.module'

@Module({
  imports: [RunnerModule]
})
export class AppModule {}
