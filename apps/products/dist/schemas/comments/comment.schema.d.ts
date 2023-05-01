import { Document } from 'mongoose';
export declare type CommentDocument = Comment & Document;
export declare class Comment {
    id: Number;
    body: String;
    username: String;
}
export declare const CommentSchema: import("mongoose").Schema<Document<Comment, any, any>, import("mongoose").Model<any, any, any>, undefined, any>;
