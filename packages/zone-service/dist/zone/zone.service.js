"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ZoneService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoneService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const prisma_1 = require("../prisma");
let ZoneService = ZoneService_1 = class ZoneService {
    constructor() {
        this.logger = new common_1.Logger(ZoneService_1.name);
        // In-memory cache for real-time updates
        this.zones$ = new rxjs_1.BehaviorSubject([]);
    }
    async onModuleInit() {
        // Load existing zones from database
        const zones = await prisma_1.prisma.zone.findMany();
        this.zones$.next(zones.map(z => ({
            ...z,
            polygon: z.polygon,
            capturedAt: z.capturedAt.toISOString()
        })));
    }
    async createZone(payload) {
        const zone = await prisma_1.prisma.zone.create({
            data: {
                ownerId: payload.ownerId,
                polygon: payload.polygon
            }
        });
        // Update in-memory cache
        const currentZones = this.zones$.value;
        currentZones.push({
            ...zone,
            polygon: zone.polygon,
            capturedAt: zone.capturedAt.toISOString()
        });
        this.zones$.next([...currentZones]);
        this.logger.debug(`Created zone ${zone.id} for owner ${payload.ownerId}`);
        return {
            ...zone,
            polygon: zone.polygon,
            capturedAt: zone.capturedAt.toISOString()
        };
    }
    async captureZone(payload) {
        const updated = await prisma_1.prisma.zone.update({
            where: { id: payload.zoneId },
            data: {
                ownerId: payload.runnerId,
                capturedAt: new Date()
            }
        }).catch(() => null);
        if (!updated)
            return null;
        // Update in-memory cache
        const currentZones = this.zones$.value;
        const index = currentZones.findIndex(z => z.id === payload.zoneId);
        if (index >= 0) {
            currentZones[index] = {
                ...updated,
                polygon: updated.polygon,
                capturedAt: updated.capturedAt.toISOString()
            };
            this.zones$.next([...currentZones]);
        }
        this.logger.debug(`Zone ${payload.zoneId} captured by ${payload.runnerId}`);
        return {
            ...updated,
            polygon: updated.polygon,
            capturedAt: updated.capturedAt.toISOString()
        };
    }
    getZones() {
        return this.zones$.asObservable();
    }
};
exports.ZoneService = ZoneService;
exports.ZoneService = ZoneService = ZoneService_1 = __decorate([
    (0, common_1.Injectable)()
], ZoneService);
//# sourceMappingURL=zone.service.js.map