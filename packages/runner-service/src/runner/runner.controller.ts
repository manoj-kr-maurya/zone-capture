import { Controller, Logger } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { RunnerService } from './runner.service'
import { TrackLocationPayload } from '@run-for-zone/shared'

@Controller()
export class RunnerController {
  private readonly logger = new Logger(RunnerController.name)

  constructor(private readonly runnerService: RunnerService) {}

  @MessagePattern('track_location')
  trackLocation(@Payload() payload: TrackLocationPayload) {
    this.logger.debug(`track_location message received for runner ${payload.runnerId}`)
    return this.runnerService.trackLocation(payload)
  }
}
