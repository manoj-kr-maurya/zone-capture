import { Observable } from 'rxjs';
import { CaptureZonePayload, CreateZonePayload, Zone } from '@run-for-zone/shared';
export declare class ZoneService {
    private readonly logger;
    private readonly zones;
    private readonly zones$;
    createZone(payload: CreateZonePayload): Zone;
    captureZone(payload: CaptureZonePayload): Zone | null;
    getZones(): Observable<Zone[]>;
}
