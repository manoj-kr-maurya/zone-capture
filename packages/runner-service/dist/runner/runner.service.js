"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RunnerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunnerService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let RunnerService = RunnerService_1 = class RunnerService {
    constructor() {
        this.logger = new common_1.Logger(RunnerService_1.name);
        // In-memory cache for demo / initial implementation
        this.runners = new Map();
        this.runners$ = new rxjs_1.BehaviorSubject([]);
    }
    trackLocation(payload) {
        const existing = this.runners.get(payload.runnerId);
        const now = new Date().toISOString();
        const updated = {
            id: payload.runnerId,
            name: existing?.name ?? `runner-${payload.runnerId}`,
            path: [...(existing?.path ?? []), payload.location],
            updatedAt: now
        };
        this.runners.set(payload.runnerId, updated);
        this.runners$.next(Array.from(this.runners.values()));
        this.logger.debug(`Tracked location for runner ${payload.runnerId}`);
        return updated;
    }
    getRunners() {
        return this.runners$.asObservable();
    }
};
exports.RunnerService = RunnerService;
exports.RunnerService = RunnerService = RunnerService_1 = __decorate([
    (0, common_1.Injectable)()
], RunnerService);
//# sourceMappingURL=runner.service.js.map