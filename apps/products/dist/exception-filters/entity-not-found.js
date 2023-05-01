"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityNotFoundExceptionFilter = void 0;
class EntityNotFoundExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        return response
            .status(404)
            .json({
            message: {
                statusCode: 404,
                error: 'Not Found',
                message: exception.message,
            },
        });
    }
}
exports.EntityNotFoundExceptionFilter = EntityNotFoundExceptionFilter;
//# sourceMappingURL=entity-not-found.js.map