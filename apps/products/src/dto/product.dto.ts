import { ApiProperty } from "@nestjs/swagger";
import {IsString, IsNotEmpty, IsEmail} from 'class-validator';
import { ObjectId } from "mongoose";

export class ProductDto{
    @ApiProperty({
        type: String,
        description: 'Product title'
    })
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        type: String,
        description: 'Product seller'
    })
    @IsNotEmpty()
    seller: string;

    @ApiProperty({
        type: String,
        description: 'Product image'
    })
    @IsNotEmpty()
    image: string;

    @ApiProperty({
        type: Number,
        description: 'Product price'
    })
    @IsNotEmpty()
    price: number;

    @ApiProperty({
        type: String,
        description: 'Product description'
    })
    @IsNotEmpty()
    description: string;


    @ApiProperty({
        type: String,
        description: 'Products shop'
    })
    @IsNotEmpty()
    shop: string;

    @ApiProperty({
        type: [],
        description: 'Products comments'
    })
    @IsNotEmpty()
    comments: [
        {
            body: String,
            username: String,
            createdAt: String
        }
      ];

    @ApiProperty({
        type: Number,
        description: 'Product latitude'
    })
    @IsNotEmpty()
    latitude: number;

    @ApiProperty({
        type: Number,
        description: 'Product longitude'
    })
    @IsNotEmpty()
    longitude: number;

}