import { RunnerService } from './runner.service';
import { TrackLocationPayload } from '@run-for-zone/shared';
export declare class RunnerController {
    private readonly runnerService;
    private readonly logger;
    constructor(runnerService: RunnerService);
    trackLocation(payload: TrackLocationPayload): import("@run-for-zone/shared").Runner;
}
