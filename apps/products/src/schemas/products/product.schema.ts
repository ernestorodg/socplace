import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Comment } from '../comments/comment.schema';
import { Express } from 'express'

export type ProductDocument = Product & Document;


@Schema()
export class Product {

    @Prop({required: true})
    title: string;

    @Prop({required: true})
    seller: string;

    @Prop()
    image: string;

    @Prop({required: true})
    price: number;

    @Prop()
    latitude: number;

    @Prop()
    longitude: number;

    @Prop()
    description: string;

    @Prop()
    category: string;

    @Prop()
    comments: [Comment];

}

export const ProductSchema = SchemaFactory.createForClass(Product);
