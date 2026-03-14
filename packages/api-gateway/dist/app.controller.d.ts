import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CaptureZonePayload, CreateZonePayload, TrackLocationPayload } from '@run-for-zone/shared';
import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    private readonly runnerClient;
    private readonly zoneClient;
    constructor(appService: AppService, runnerClient: ClientProxy, zoneClient: ClientProxy);
    health(): {
        status: string;
        service: string;
    };
    trackLocation(body: TrackLocationPayload): Observable<any>;
    createZone(body: CreateZonePayload): Observable<any>;
    captureZone(body: CaptureZonePayload): Observable<any>;
}
