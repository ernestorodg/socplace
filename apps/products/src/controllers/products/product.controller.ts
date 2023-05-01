import { Controller, Get, Req, Post,
         Body, Param, Put, Delete,
         HttpCode, Res
  } from '@nestjs/common';
import { Request } from 'express';
import { ProductDto } from 'src/dto/product.dto';
import { CommentDto } from 'src/dto/comment.dto';
import { Product } from 'src/schemas/products/product.schema';
import { ProductsService } from 'src/services/products/product.service';
import { ProductResponse } from 'src/api-doc/product.response';
import { ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile, UseInterceptors } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { diskStorage } from 'multer';
import path = require('path');
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';

export const storage = {
  storage: diskStorage({
      destination: './uploads/products-images',
      filename: (req, file, cb) => {
          const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
          const extension: string = path.parse(file.originalname).ext;

          cb(null, `${filename}${extension}`)
      }
  })
}

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService
  ) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @ApiOkResponse({
    type: ProductResponse
  })
  @Post('filter')
  async filter(@Body() productDto: ProductDto) {
    return this.productsService.filter(productDto);
  }

  // @ApiOkResponse({
  //   type: ProductResponse
  // })
  // @Post('filterByIds')
  // async filterByIds(@Body() productsIds: [ProductDto]) {
  //   return this.productsService.filter(productDto);
  // }

  @ApiOkResponse({
    type: ProductResponse
  })
  @Post(':t')
  async lookForProductTitle(@Param('t') title: string) {
    let productDto = new ProductDto();
    productDto.title = title
    return this.productsService.filter(productDto);
  }

  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file'))
  // uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   console.log(file);
  // }

  @Post('image/upload')
  @UseInterceptors(FileInterceptor('file', storage))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
      return of(file);
  }


  @Post()
  async create(@Body() productDto: ProductDto) {
    return this.productsService.create(productDto);
  }

  @Post('comment/:id')
  async createComment(@Param('id') id: string, @Body() comment: CommentDto) {
    return this.productsService.comment(id, comment);
  } 

  @ApiOkResponse({
    type: ProductResponse
  })
  @Get(':id')
  async show(@Param('id') id: string): Promise<Product> {
    return this.productsService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: Product): Promise<Product> {
    await this.productsService.findById(id);
    this.productsService.update(id, body);
    return this.productsService.findById(id);
  }

  @Delete(':id')
  @HttpCode(204)
  async destroy(@Param('id') id: string): Promise<void> {
    await this.productsService.findById(id);
    this.productsService.deleteById(id);
  }

  @Get('image/:imagename')
  findImage(@Param('imagename') imagename, @Res() res) {
      return of(res.sendFile(join(process.cwd(), 'uploads/products-images/' + imagename)));
  }


}