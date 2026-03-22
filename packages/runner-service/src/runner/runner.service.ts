import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { BehaviorSubject, Observable } from 'rxjs'
import { TrackLocationPayload, Runner } from '@run-for-zone/shared'
import { prisma } from '../prisma'

@Injectable()
export class RunnerService implements OnModuleInit {
  private readonly logger = new Logger(RunnerService.name)

  // In-memory cache for real-time updates
  private readonly runners$ = new BehaviorSubject<Runner[]>([])

  async onModuleInit() {
    // Load existing runners from database
    const runners = await prisma.runner.findMany()
    this.runners$.next(runners.map(r => ({
      ...r,
      path: r.path as any[],
      updatedAt: r.updatedAt.toISOString()
    })))
  }

  async trackLocation(payload: TrackLocationPayload): Promise<Runner> {
    const existing = await prisma.runner.findUnique({
      where: { id: payload.runnerId }
    })

    const now = new Date()

    const updated = await prisma.runner.upsert({
      where: { id: payload.runnerId },
      update: {
        path: [...(existing?.path as any[] ?? []), payload.location],
        updatedAt: now
      },
      create: {
        id: payload.runnerId,
        name: `runner-${payload.runnerId}`,
        path: [payload.location]
      }
    })

    // Update in-memory cache
    const currentRunners = this.runners$.value
    const index = currentRunners.findIndex(r => r.id === payload.runnerId)
    const runnerWithPath = {
      ...updated,
      path: updated.path as any[],
      updatedAt: updated.updatedAt.toISOString()
    }
    if (index >= 0) {
      currentRunners[index] = runnerWithPath
    } else {
      currentRunners.push(runnerWithPath)
    }
    this.runners$.next([...currentRunners])

    this.logger.debug(`Tracked location for runner ${payload.runnerId}`)

    return runnerWithPath
  }

  getRunners(): Observable<Runner[]> {
    return this.runners$.asObservable()
  }
}
