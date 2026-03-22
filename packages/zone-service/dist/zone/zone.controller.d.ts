import { CaptureZonePayload, CreateZonePayload } from '@run-for-zone/shared';
import { ZoneService } from './zone.service';
export declare class ZoneController {
    private readonly zoneService;
    private readonly logger;
    constructor(zoneService: ZoneService);
    createZone(payload: CreateZonePayload): Promise<import("@run-for-zone/shared").Zone>;
    captureZone(payload: CaptureZonePayload): Promise<import("@run-for-zone/shared").Zone | null>;
}
