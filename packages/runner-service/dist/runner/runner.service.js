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
const prisma_1 = require("../prisma");
let RunnerService = RunnerService_1 = class RunnerService {
    constructor() {
        this.logger = new common_1.Logger(RunnerService_1.name);
        // In-memory cache for real-time updates
        this.runners$ = new rxjs_1.BehaviorSubject([]);
    }
    async onModuleInit() {
        // Load existing runners from database
        const runners = await prisma_1.prisma.runner.findMany();
        this.runners$.next(runners.map(r => ({
            ...r,
            path: r.path,
            updatedAt: r.updatedAt.toISOString()
        })));
    }
    async trackLocation(payload) {
        const existing = await prisma_1.prisma.runner.findUnique({
            where: { id: payload.runnerId }
        });
        const now = new Date();
        const updated = await prisma_1.prisma.runner.upsert({
            where: { id: payload.runnerId },
            update: {
                path: [...(existing?.path ?? []), payload.location],
                updatedAt: now
            },
            create: {
                id: payload.runnerId,
                name: `runner-${payload.runnerId}`,
                path: [payload.location]
            }
        });
        // Update in-memory cache
        const currentRunners = this.runners$.value;
        const index = currentRunners.findIndex(r => r.id === payload.runnerId);
        const runnerWithPath = {
            ...updated,
            path: updated.path,
            updatedAt: updated.updatedAt.toISOString()
        };
        if (index >= 0) {
            currentRunners[index] = runnerWithPath;
        }
        else {
            currentRunners.push(runnerWithPath);
        }
        this.runners$.next([...currentRunners]);
        this.logger.debug(`Tracked location for runner ${payload.runnerId}`);
        return runnerWithPath;
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