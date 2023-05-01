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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ProductDto {
}
__decorate([
    swagger_1.ApiProperty({
        type: String,
        description: 'Product title'
    }),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], ProductDto.prototype, "title", void 0);
__decorate([
    swagger_1.ApiProperty({
        type: String,
        description: 'Product seller'
    }),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], ProductDto.prototype, "seller", void 0);
__decorate([
    swagger_1.ApiProperty({
        type: String,
        description: 'Product image'
    }),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], ProductDto.prototype, "image", void 0);
__decorate([
    swagger_1.ApiProperty({
        type: Number,
        description: 'Product price'
    }),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], ProductDto.prototype, "price", void 0);
__decorate([
    swagger_1.ApiProperty({
        type: String,
        description: 'Product description'
    }),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], ProductDto.prototype, "description", void 0);
__decorate([
    swagger_1.ApiProperty({
        type: String,
        description: 'Products shop'
    }),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], ProductDto.prototype, "shop", void 0);
__decorate([
    swagger_1.ApiProperty({
        type: [],
        description: 'Products comments'
    }),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Array)
], ProductDto.prototype, "comments", void 0);
__decorate([
    swagger_1.ApiProperty({
        type: Number,
        description: 'Product latitude'
    }),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], ProductDto.prototype, "latitude", void 0);
__decorate([
    swagger_1.ApiProperty({
        type: Number,
        description: 'Product longitude'
    }),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], ProductDto.prototype, "longitude", void 0);
exports.ProductDto = ProductDto;
//# sourceMappingURL=product.dto.js.map