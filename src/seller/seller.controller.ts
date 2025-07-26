import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SellerService } from './seller.service';
import { CreateProductDto } from './dto/create.product.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage, MulterError } from 'multer';
import { UpdateProductDto } from './dto/update.product.dto';
import { Product } from './product.entity';
import { CreateSellerDto } from './dto/create.seller.dto';

@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  //👉 Seller-related routes
  @Post('signup')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(
    FileInterceptor('nidImage', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
          cb(null, true);
        else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },
      limits: { fileSize: 1048576 * 2 }, // 2MB limit
      storage: diskStorage({
        destination: './uploads/sellerNID',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  creareSeller(
    @UploadedFile() nidImage: Express.Multer.File,
    @Body() createSellerDto: CreateSellerDto,
  ) {
    if (!nidImage) {
      throw new BadRequestException('NID image is required');
    }
    createSellerDto.nidImage = nidImage.filename;
    return this.sellerService.creareSeller(createSellerDto);
  }

  //👉 Product-related routes
  @Get('products')
  getProducts(): Promise<Product[]> {
    return this.sellerService.getProducts();
  }
  @Get('products/:productId')
  getImagesByProductId(
    @Param('productId', ParseIntPipe) productId: number,
  ): Promise<{ url: string; filename: string }[]> {
    return this.sellerService.getImagesByProductId(productId);
  }

  @Post('products/add')
  @UsePipes(new ValidationPipe())
  createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.sellerService.createProduct(createProductDto);
  }

  @Post('products/upload')
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
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, Date.now() + '-' + file.originalname);
        },
      }),
    }),
  )
  uploadFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    if (!files) {
      throw new MulterError('LIMIT_UNEXPECTED_FILE', 'files');
    }

    // Assign all filenames to the images array
    createProductDto.images = files.map((file) => file.filename);
    return this.sellerService.createProduct(createProductDto);
  }

  @Patch('products/update/:productId')
  @UsePipes(new ValidationPipe())
  updateProduct(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.sellerService.updateProduct(productId, updateProductDto);
  }

  @Delete('products/delete/:productId')
  deleteProductById(
    @Param('productId', ParseIntPipe) productId: number,
  ): Promise<{ message: string }> {
    return this.sellerService.deleteProductById(productId).then(() => ({
      message: 'Delete success',
    }));
  }
}
