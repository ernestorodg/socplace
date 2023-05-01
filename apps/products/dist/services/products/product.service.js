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
exports.ProductsService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const product_schema_1 = require("../../schemas/products/product.schema");
const comment_schema_1 = require("../../schemas/comments/comment.schema");
let ProductsService = class ProductsService {
    constructor(productModel) {
        this.productModel = productModel;
    }
    async create(ProductDto) {
        const createdProduct = new this.productModel(ProductDto);
        return createdProduct.save();
    }
    async comment(id, comment) {
        const body = comment.body;
        const username = comment.username;
        const product = await this.productModel.findById(id).exec();
        let newComment = new comment_schema_1.Comment();
        newComment.body = body;
        newComment.username = username;
        newComment.id = product.comments.length;
        if (product) {
            product.comments.unshift(newComment);
            await product.save();
            return product;
        }
        else
            throw new Error();
    }
    async findAll() {
        return this.productModel.find().exec();
    }
    async filter(dtoParams) {
        let params = JSON.stringify(dtoParams);
        let object = JSON.parse(params);
        Object.keys(object).map(function (key, index) {
            object[key] = { "$regex": object[key], "$options": "i" };
        });
        let databaseResponse = this.productModel.find(object).exec();
        return databaseResponse;
    }
    async findById(id) {
        return this.productModel.findById(id).exec();
    }
    async update(id, product) {
        return this.productModel.findByIdAndUpdate(id, product).exec();
    }
    async deleteById(id) {
        const deletedProduct = this.productModel.findOneAndDelete({ _id: id }).exec();
        return (await deletedProduct).remove();
    }
};
ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=product.service.js.map