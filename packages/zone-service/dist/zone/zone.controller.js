"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ZoneController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoneController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const zone_service_1 = require("./zone.service");
let ZoneController = ZoneController_1 = class ZoneController {
    constructor(zoneService) {
        this.zoneService = zoneService;
        this.logger = new common_1.Logger(ZoneController_1.name);
    }
    createZone(payload) {
        this.logger.debug(`create_zone message received for owner ${payload.ownerId}`);
        return this.zoneService.createZone(payload);
    }
    captureZone(payload) {
        this.logger.debug(`capture_zone message received for zone ${payload.zoneId}`);
        return this.zoneService.captureZone(payload);
    }
};
exports.ZoneController = ZoneController;
__decorate([
    (0, microservices_1.MessagePattern)('create_zone'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ZoneController.prototype, "createZone", null);
__decorate([
    (0, microservices_1.MessagePattern)('capture_zone'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ZoneController.prototype, "captureZone", null);
exports.ZoneController = ZoneController = ZoneController_1 = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [zone_service_1.ZoneService])
], ZoneController);
//# sourceMappingURL=zone.controller.js.map