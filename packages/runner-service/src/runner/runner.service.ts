import { Injectable, Logger } from '@nestjs/common'
import { BehaviorSubject, Observable } from 'rxjs'
import { TrackLocationPayload, Runner } from '@run-for-zone/shared'

@Injectable()
export class RunnerService {
  private readonly logger = new Logger(RunnerService.name)

  // In-memory cache for demo / initial implementation
  private readonly runners = new Map<string, Runner>()
  private readonly runners$ = new BehaviorSubject<Runner[]>([])

  trackLocation(payload: TrackLocationPayload): Runner {
    const existing = this.runners.get(payload.runnerId)
    const now = new Date().toISOString()

    const updated: Runner = {
      id: payload.runnerId,
      name: existing?.name ?? `runner-${payload.runnerId}`,
      path: [...(existing?.path ?? []), payload.location],
      updatedAt: now
    }

    this.runners.set(payload.runnerId, updated)
    this.runners$.next(Array.from(this.runners.values()))
    this.logger.debug(`Tracked location for runner ${payload.runnerId}`)

    return updated
  }

  getRunners(): Observable<Runner[]> {
    return this.runners$.asObservable()
  }
}
