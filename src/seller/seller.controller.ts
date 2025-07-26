import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SellerService } from './seller.service';
import { CreateProductDto } from './dto/create.product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage, MulterError } from 'multer';
import { UpdateProductDto } from './dto/update.product.dto';
import { CreateSellerDto } from './dto/create.seller.dto';

@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  // 👉 Seller-related route
  @Post('signup')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FilesInterceptor('nidImage', 2, {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/\.(jpg|webp|png|jpeg)$/)) {
          cb(null, true);
        } else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'files'), false);
        }
      },
      limits: { fileSize: 1048576 * 2 },
      storage: diskStorage({
        destination: './uploads/sellerNID',
        filename: (req, file, cb) => {
          cb(null, Date.now() + '-' + file.originalname);
        },
      }),
    }),
  )
  signupSeller(
    @UploadedFiles() nidImage: Express.Multer.File[],
    @Body() createSellerDto: CreateSellerDto,
  ) {
    if (!nidImage) {
      throw new BadRequestException('NID image is required');
    }
    createSellerDto.nidImage = nidImage.map((image) => image.filename);
    return this.sellerService.singnupSeller(createSellerDto);
  }

  // 👉 Product-related route
  @Get('products')
  getProducts() {
    return this.sellerService.getProducts();
  }
  @Get('products/:productId')
  getImagesByProductId(@Param('productId', ParseIntPipe) productId: number) {
    return this.sellerService.getImagesByProductId(productId);
  }

  @Post('products/add')
  @UsePipes(new ValidationPipe())
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.sellerService.createProduct(createProductDto);
  }

  @Patch('products/update/:productId')
  @UsePipes(new ValidationPipe())
  updateProduct(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.sellerService.updateProduct(productId, updateProductDto);
  }

  @Post('upload')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(
    FilesInterceptor('files', 5, {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/\.(jpg|webp|png|jpeg)$/)) {
          cb(null, true);
        } else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'files'), false);
        }
      },
      limits: { fileSize: 1048576 },
      storage: diskStorage({
        destination: './uploads/products',
        filename: (req, file, cb) => {
          cb(null, Date.now() + '-' + file.originalname);
        },
      }),
    }),
  )
  uploadFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createProductDto: CreateProductDto,
  ) {
    if (!files) {
      throw new MulterError('LIMIT_UNEXPECTED_FILE', 'files');
    }

    // Assign all filenames to the images array
    createProductDto.images = files.map((file) => file.filename);
    return this.sellerService.createProduct(createProductDto);
  }

  @Post('add')
  addProduct(@Body() createProductDto: CreateProductDto) {
    return this.sellerService.createProduct(createProductDto);
  }
}
