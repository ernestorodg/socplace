import { ApiProperty } from "@nestjs/swagger";

export class ProductResponse {
    @ApiProperty()
    id: number;

    @ApiProperty({
        type: String,
        description: 'Username'
    })
    title: string;

    @ApiProperty()
    seller: string;

    @ApiProperty()
    created_at:Date
}