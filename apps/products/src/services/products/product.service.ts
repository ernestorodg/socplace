import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from '../../schemas/products/product.schema';
import { Comment } from '../../schemas/comments/comment.schema'
import { ProductDto } from '../../dto/product.dto';
import { CommentDto } from '../../dto/comment.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  async create(ProductDto: ProductDto): Promise<Product> {
    const createdProduct = new this.productModel(ProductDto);
    return createdProduct.save();
  }

  async comment(id: string, comment: CommentDto): Promise<Product> {
    const body: string = comment.body;
    const username: string = comment.username;
    const product = await this.productModel.findById(id).exec();

    let newComment = new Comment();
    newComment.body = body;
    newComment.username = username;
    newComment.id = product.comments.length

    if (product) {
      product.comments.unshift(
        newComment
      );
      await product.save();
      return product;
    } else throw new Error(); //  not found
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async filter(dtoParams: ProductDto): Promise<Product[]> {    
    let params: string = JSON.stringify(dtoParams);
    let object: {} = JSON.parse(params)
    Object.keys(object).map(function(key, index) {
      object[key] = { "$regex": object[key], "$options": "i" };
    });    
    let databaseResponse = this.productModel.find(object).exec();
    return databaseResponse
  }

  async findById(id: string): Promise<Product> {
    return this.productModel.findById(id).exec();
  }

  async update(id: string, product: Product): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, product).exec();
  }

  async deleteById(id: string) {
    const deletedProduct = this.productModel.findOneAndDelete({ _id: id }).exec();
    return (await deletedProduct).remove();
  }
}