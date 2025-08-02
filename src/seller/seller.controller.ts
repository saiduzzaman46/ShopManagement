import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { SellerService } from './seller.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateSellerDto } from './dto/create.seller.dto';
import { FileCleanupInterceptor } from '../utils/file-cleanup.interceptor';
import { insertFile } from 'src/utils/multer.util';
import { Seller } from './entity/create.seller.entity';

@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  // 👉 Seller-related route
  @Post('signup')
  @UseInterceptors(
    FilesInterceptor(
      'nidImage',
      2,
      insertFile(
        './uploads/sellerNID',
        /\.(jpg|jpeg|png)$/i,
        2 * 1024 * 1024,
        'jpg, jpeg, png, webp',
      ),
    ),
    new FileCleanupInterceptor('./uploads/sellerNID'),
  )
  signupSeller(
    @Body() createSellerDto: CreateSellerDto,
    @UploadedFiles() nidImage: Express.Multer.File[],
  ): Promise<Seller> {
    if (!nidImage || nidImage.length === 0) {
      throw new BadRequestException('NID image is required');
    }

    createSellerDto.nidImage = nidImage.map((image) => image.filename);
    return this.sellerService.singnupSeller(createSellerDto);
  }
  @Get()
  async findSellers(@Query() query: any) {
    const sellers = await this.sellerService.getFilteredSellers(query);
    if (!sellers || sellers.length === 0) {
      return { message: 'No sellers found' };
    }
    return sellers;
  }

  @Delete()
  async deleteSellerByUsername(
    @Query('username') username: string,
  ): Promise<{ message: string }> {
    const result = await this.sellerService.deleteSellerByUsername(username);

    if (!result) {
      throw new NotFoundException('Seller not found');
    }

    return { message: 'Seller deleted successfully' };
  }
}
