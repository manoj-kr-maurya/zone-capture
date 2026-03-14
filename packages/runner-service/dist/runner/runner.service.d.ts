import { Observable } from 'rxjs';
import { TrackLocationPayload, Runner } from '@run-for-zone/shared';
export declare class RunnerService {
    private readonly logger;
    private readonly runners;
    private readonly runners$;
    trackLocation(payload: TrackLocationPayload): Runner;
    getRunners(): Observable<Runner[]>;
}
