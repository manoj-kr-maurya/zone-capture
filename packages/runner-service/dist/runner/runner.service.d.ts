import { OnModuleInit } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TrackLocationPayload, Runner } from '@run-for-zone/shared';
export declare class RunnerService implements OnModuleInit {
    private readonly logger;
    private readonly runners$;
    onModuleInit(): Promise<void>;
    trackLocation(payload: TrackLocationPayload): Promise<Runner>;
    getRunners(): Observable<Runner[]>;
}
