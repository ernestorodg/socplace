import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Product, ProductSchema } from './schemas/products/product.schema';
import { ProductsController } from './controllers/products/product.controller';
import { ProductsService } from './services/products/product.service';

let mongooseConfig: {} = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB, mongooseConfig),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
      
      ],
  controllers: [
    ProductsController
  ],
  providers: [
    AppService,
    ProductsService
  ],
})
export class AppModule {}
