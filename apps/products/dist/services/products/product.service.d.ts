import { Model } from 'mongoose';
import { Product, ProductDocument } from '../../schemas/products/product.schema';
import { ProductDto } from '../../dto/product.dto';
import { CommentDto } from '../../dto/comment.dto';
export declare class ProductsService {
    private productModel;
    constructor(productModel: Model<ProductDocument>);
    create(ProductDto: ProductDto): Promise<Product>;
    comment(id: string, comment: CommentDto): Promise<Product>;
    findAll(): Promise<Product[]>;
    filter(dtoParams: ProductDto): Promise<Product[]>;
    findById(id: string): Promise<Product>;
    update(id: string, product: Product): Promise<Product>;
    deleteById(id: string): Promise<ProductDocument>;
}
