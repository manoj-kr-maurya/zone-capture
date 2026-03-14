"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    // Example: expose the API gateway on port 3000
    await app.listen(3000);
    console.log('API Gateway running on http://localhost:3000');
}
bootstrap().catch((err) => {
    console.error('Failed to start API gateway', err);
    process.exit(1);
});
//# sourceMappingURL=main.js.map