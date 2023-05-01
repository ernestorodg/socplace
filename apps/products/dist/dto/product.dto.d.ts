export declare class ProductDto {
    title: string;
    seller: string;
    image: string;
    price: number;
    description: string;
    shop: string;
    comments: [
        {
            body: String;
            username: String;
            createdAt: String;
        }
    ];
    latitude: number;
    longitude: number;
}
