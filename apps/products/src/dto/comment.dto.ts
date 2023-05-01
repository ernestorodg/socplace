import { ApiProperty } from "@nestjs/swagger";
import {IsNotEmpty} from 'class-validator';

export class CommentDto{
    @ApiProperty({
        type: String,
        description: 'Comment body'
    })
    @IsNotEmpty()
    public body: string;

    @ApiProperty({
        type: String,
        description: 'Username that commented'
    })
    @IsNotEmpty()
    public username: string;
}