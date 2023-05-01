import { Document } from 'mongoose';
import { Comment } from '../comments/comment.schema';
export declare type ProductDocument = Product & Document;
export declare class Product {
    title: string;
    seller: string;
    image: string;
    price: number;
    latitude: number;
    longitude: number;
    description: string;
    category: string;
    comments: [Comment];
}
export declare const ProductSchema: import("mongoose").Schema<Document<Product, any, any>, import("mongoose").Model<any, any, any>, undefined, any>;
