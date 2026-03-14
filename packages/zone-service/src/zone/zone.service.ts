import { Injectable, Logger } from '@nestjs/common'
import { BehaviorSubject, Observable } from 'rxjs'
import { CaptureZonePayload, CreateZonePayload, Zone } from '@run-for-zone/shared'

@Injectable()
export class ZoneService {
  private readonly logger = new Logger(ZoneService.name)
  private readonly zones = new Map<string, Zone>()
  private readonly zones$ = new BehaviorSubject<Zone[]>([])

  createZone(payload: CreateZonePayload): Zone {
    const id = `zone-${Date.now()}`
    const now = new Date().toISOString()

    const zone: Zone = {
      id,
      ownerId: payload.ownerId,
      polygon: payload.polygon,
      capturedAt: now
    }

    this.zones.set(id, zone)
    this.zones$.next(Array.from(this.zones.values()))
    this.logger.debug(`Created zone ${id} for owner ${payload.ownerId}`)

    return zone
  }

  captureZone(payload: CaptureZonePayload): Zone | null {
    const zone = this.zones.get(payload.zoneId)
    if (!zone) return null

    const updated: Zone = {
      ...zone,
      ownerId: payload.runnerId,
      capturedAt: new Date().toISOString()
    }

    this.zones.set(payload.zoneId, updated)
    this.zones$.next(Array.from(this.zones.values()))
    this.logger.debug(`Zone ${payload.zoneId} captured by ${payload.runnerId}`)

    return updated
  }

  getZones(): Observable<Zone[]> {
    return this.zones$.asObservable()
  }
}
