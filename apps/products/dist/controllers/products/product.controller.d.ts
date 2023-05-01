/// <reference types="multer" />
import { ProductDto } from 'src/dto/product.dto';
import { CommentDto } from 'src/dto/comment.dto';
import { Product } from 'src/schemas/products/product.schema';
import { ProductsService } from 'src/services/products/product.service';
import { Observable } from 'rxjs';
export declare const storage: {
    storage: import("multer").StorageEngine;
};
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(): Promise<Product[]>;
    filter(productDto: ProductDto): Promise<Product[]>;
    lookForProductTitle(title: string): Promise<Product[]>;
    uploadFile(file: Express.Multer.File): Observable<Express.Multer.File>;
    create(productDto: ProductDto): Promise<Product>;
    createComment(id: string, comment: CommentDto): Promise<Product>;
    show(id: string): Promise<Product>;
    update(id: string, body: Product): Promise<Product>;
    destroy(id: string): Promise<void>;
    findImage(imagename: any, res: any): Observable<any>;
}
