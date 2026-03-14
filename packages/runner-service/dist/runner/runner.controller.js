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
var RunnerController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunnerController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const runner_service_1 = require("./runner.service");
let RunnerController = RunnerController_1 = class RunnerController {
    constructor(runnerService) {
        this.runnerService = runnerService;
        this.logger = new common_1.Logger(RunnerController_1.name);
    }
    trackLocation(payload) {
        this.logger.debug(`track_location message received for runner ${payload.runnerId}`);
        return this.runnerService.trackLocation(payload);
    }
};
exports.RunnerController = RunnerController;
__decorate([
    (0, microservices_1.MessagePattern)('track_location'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RunnerController.prototype, "trackLocation", null);
exports.RunnerController = RunnerController = RunnerController_1 = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [runner_service_1.RunnerService])
], RunnerController);
//# sourceMappingURL=runner.controller.js.map