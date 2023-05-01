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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = exports.storage = void 0;
const common_1 = require("@nestjs/common");
const product_dto_1 = require("../../dto/product.dto");
const comment_dto_1 = require("../../dto/comment.dto");
const product_schema_1 = require("../../schemas/products/product.schema");
const product_service_1 = require("../../services/products/product.service");
const product_response_1 = require("../../api-doc/product.response");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const common_2 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const multer_1 = require("multer");
const path = require("path");
const uuid_1 = require("uuid");
const path_1 = require("path");
exports.storage = {
    storage: (0, multer_1.diskStorage)({
        destination: './uploads/products-images',
        filename: (req, file, cb) => {
            const filename = path.parse(file.originalname).name.replace(/\s/g, '') + (0, uuid_1.v4)();
            const extension = path.parse(file.originalname).ext;
            cb(null, `${filename}${extension}`);
        }
    })
};
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    async findAll() {
        return this.productsService.findAll();
    }
    async filter(productDto) {
        return this.productsService.filter(productDto);
    }
    async lookForProductTitle(title) {
        let productDto = new product_dto_1.ProductDto();
        productDto.title = title;
        return this.productsService.filter(productDto);
    }
    uploadFile(file) {
        return (0, rxjs_1.of)(file);
    }
    async create(productDto) {
        return this.productsService.create(productDto);
    }
    async createComment(id, comment) {
        return this.productsService.comment(id, comment);
    }
    async show(id) {
        return this.productsService.findById(id);
    }
    async update(id, body) {
        await this.productsService.findById(id);
        this.productsService.update(id, body);
        return this.productsService.findById(id);
    }
    async destroy(id) {
        await this.productsService.findById(id);
        this.productsService.deleteById(id);
    }
    findImage(imagename, res) {
        return (0, rxjs_1.of)(res.sendFile((0, path_1.join)(process.cwd(), 'uploads/products-images/' + imagename)));
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        type: product_response_1.ProductResponse
    }),
    (0, common_1.Post)('filter'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.ProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "filter", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        type: product_response_1.ProductResponse
    }),
    (0, common_1.Post)(':t'),
    __param(0, (0, common_1.Param)('t')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "lookForProductTitle", null);
__decorate([
    (0, common_1.Post)('image/upload'),
    (0, common_2.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', exports.storage)),
    __param(0, (0, common_2.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.ProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('comment/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, comment_dto_1.CommentDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "createComment", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        type: product_response_1.ProductResponse
    }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "show", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, product_schema_1.Product]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "destroy", null);
__decorate([
    (0, common_1.Get)('image/:imagename'),
    __param(0, (0, common_1.Param)('imagename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findImage", null);
ProductsController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [product_service_1.ProductsService])
], ProductsController);
exports.ProductsController = ProductsController;
//# sourceMappingURL=product.controller.js.map