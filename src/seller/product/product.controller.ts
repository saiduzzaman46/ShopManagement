import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create.product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { insertFile } from 'src/utils/multer.util';
import { FileCleanupInterceptor } from 'src/utils/file-cleanup.interceptor';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // 👉 Product-related route
  @Get('products')
  getProducts() {
    return this.productService.getProducts();
  }
  @Get('/:productId')
  getImagesByProductId(@Param('productId') productId: string) {
    return this.productService.getImagesByProductId(productId);
  }

  @Post('/add')
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Patch('update/:productId')
  updateProduct(
    @Param('productId') productId: string,
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productService.updateProduct(productId, createProductDto);
  }

  @Post('upload')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  @UseInterceptors(
    FilesInterceptor(
      'files',
      5,
      insertFile(
        './uploads/products',
        /\.(jpg|jpeg|png|webp)$/i,
        2 * 1024 * 1024,
        'jpg, jpeg, png, webp',
      ),
    ),
    new FileCleanupInterceptor('./uploads/products'),
  )
  uploadFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createProductDto: CreateProductDto,
  ) {
    if (!files) {
      throw new BadRequestException('No files uploaded');
    }

    // Assign all filenames to the images array
    createProductDto.images = files.map((file) => file.filename);
    return this.productService.createProduct(createProductDto);
  }

  @Post('add')
  addProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }
}
