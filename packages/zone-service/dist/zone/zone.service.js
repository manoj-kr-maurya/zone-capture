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
let ZoneService = ZoneService_1 = class ZoneService {
    constructor() {
        this.logger = new common_1.Logger(ZoneService_1.name);
        this.zones = new Map();
        this.zones$ = new rxjs_1.BehaviorSubject([]);
    }
    createZone(payload) {
        const id = `zone-${Date.now()}`;
        const now = new Date().toISOString();
        const zone = {
            id,
            ownerId: payload.ownerId,
            polygon: payload.polygon,
            capturedAt: now
        };
        this.zones.set(id, zone);
        this.zones$.next(Array.from(this.zones.values()));
        this.logger.debug(`Created zone ${id} for owner ${payload.ownerId}`);
        return zone;
    }
    captureZone(payload) {
        const zone = this.zones.get(payload.zoneId);
        if (!zone)
            return null;
        const updated = {
            ...zone,
            ownerId: payload.runnerId,
            capturedAt: new Date().toISOString()
        };
        this.zones.set(payload.zoneId, updated);
        this.zones$.next(Array.from(this.zones.values()));
        this.logger.debug(`Zone ${payload.zoneId} captured by ${payload.runnerId}`);
        return updated;
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