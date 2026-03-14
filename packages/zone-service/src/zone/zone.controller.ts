import { Controller, Logger } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { CaptureZonePayload, CreateZonePayload } from '@run-for-zone/shared'
import { ZoneService } from './zone.service'

@Controller()
export class ZoneController {
  private readonly logger = new Logger(ZoneController.name)

  constructor(private readonly zoneService: ZoneService) {}

  @MessagePattern('create_zone')
  createZone(@Payload() payload: CreateZonePayload) {
    this.logger.debug(`create_zone message received for owner ${payload.ownerId}`)
    return this.zoneService.createZone(payload)
  }

  @MessagePattern('capture_zone')
  captureZone(@Payload() payload: CaptureZonePayload) {
    this.logger.debug(`capture_zone message received for zone ${payload.zoneId}`)
    return this.zoneService.captureZone(payload)
  }
}
