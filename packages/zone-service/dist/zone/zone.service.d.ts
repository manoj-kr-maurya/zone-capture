import { OnModuleInit } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CaptureZonePayload, CreateZonePayload, Zone } from '@run-for-zone/shared';
export declare class ZoneService implements OnModuleInit {
    private readonly logger;
    private readonly zones$;
    onModuleInit(): Promise<void>;
    createZone(payload: CreateZonePayload): Promise<Zone>;
    captureZone(payload: CaptureZonePayload): Promise<Zone | null>;
    getZones(): Observable<Zone[]>;
}
