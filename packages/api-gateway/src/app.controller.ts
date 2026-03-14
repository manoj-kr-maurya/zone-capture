import { Body, Controller, Get, Inject, Post } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { Observable } from 'rxjs'
import {
  CaptureZonePayload,
  Coordinates,
  CreateZonePayload,
  TrackLocationPayload
} from '@run-for-zone/shared'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('RUNNER_SERVICE') private readonly runnerClient: ClientProxy,
    @Inject('ZONE_SERVICE') private readonly zoneClient: ClientProxy
  ) {}

  @Get('health')
  health() {
    return { status: 'ok', service: 'api-gateway' }
  }

  @Post('track')
  trackLocation(@Body() body: TrackLocationPayload): Observable<any> {
    return this.runnerClient.send('track_location', body)
  }

  @Post('zones')
  createZone(@Body() body: CreateZonePayload): Observable<any> {
    return this.zoneClient.send('create_zone', body)
  }

  @Post('zones/capture')
  captureZone(@Body() body: CaptureZonePayload): Observable<any> {
    return this.zoneClient.send('capture_zone', body)
  }
}
