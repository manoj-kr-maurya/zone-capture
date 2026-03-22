import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { BehaviorSubject, Observable } from 'rxjs'
import { CaptureZonePayload, CreateZonePayload, Zone } from '@run-for-zone/shared'
import { prisma } from '../prisma'

@Injectable()
export class ZoneService implements OnModuleInit {
  private readonly logger = new Logger(ZoneService.name)

  // In-memory cache for real-time updates
  private readonly zones$ = new BehaviorSubject<Zone[]>([])

  async onModuleInit() {
    // Load existing zones from database
    const zones = await prisma.zone.findMany()
    this.zones$.next(zones.map(z => ({
      ...z,
      polygon: z.polygon as any[],
      capturedAt: z.capturedAt.toISOString()
    })))
  }

  async createZone(payload: CreateZonePayload): Promise<Zone> {
    const zone = await prisma.zone.create({
      data: {
        ownerId: payload.ownerId,
        polygon: payload.polygon
      }
    })

    // Update in-memory cache
    const currentZones = this.zones$.value
    currentZones.push({
      ...zone,
      polygon: zone.polygon as any[],
      capturedAt: zone.capturedAt.toISOString()
    })
    this.zones$.next([...currentZones])

    this.logger.debug(`Created zone ${zone.id} for owner ${payload.ownerId}`)

    return {
      ...zone,
      polygon: zone.polygon as any[],
      capturedAt: zone.capturedAt.toISOString()
    }
  }

  async captureZone(payload: CaptureZonePayload): Promise<Zone | null> {
    const updated = await prisma.zone.update({
      where: { id: payload.zoneId },
      data: {
        ownerId: payload.runnerId,
        capturedAt: new Date()
      }
    }).catch(() => null)

    if (!updated) return null

    // Update in-memory cache
    const currentZones = this.zones$.value
    const index = currentZones.findIndex(z => z.id === payload.zoneId)
    if (index >= 0) {
      currentZones[index] = {
        ...updated,
        polygon: updated.polygon as any[],
        capturedAt: updated.capturedAt.toISOString()
      }
      this.zones$.next([...currentZones])
    }

    this.logger.debug(`Zone ${payload.zoneId} captured by ${payload.runnerId}`)

    return {
      ...updated,
      polygon: updated.polygon as any[],
      capturedAt: updated.capturedAt.toISOString()
    }
  }

  getZones(): Observable<Zone[]> {
    return this.zones$.asObservable()
  }
}
