import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema({_id: true, timestamps: true})
export class Comment {
    id: Number;
    body: String;
    username: String;
}
export const CommentSchema = SchemaFactory.createForClass(Comment)
