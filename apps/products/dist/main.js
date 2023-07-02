"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const entity_not_found_1 = require("./exception-filters/entity-not-found");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.useGlobalFilters(new entity_not_found_1.EntityNotFoundExceptionFilter());
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Socplace Products-Service')
        .setDescription('API Documentation')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(process.env.PORT || 4000);
}
bootstrap();
//# sourceMappingURL=main.js.map