import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { CustomerService } from './customer.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, MulterError } from 'multer';
import { CreateCustomerDto } from './dto/create.customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('create')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(
    FileInterceptor('profilePic', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
          cb(null, true);
        else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },
      limits: { fileSize: 1048576 },
      storage: diskStorage({
        destination: './uploads/customer',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  createCustomer(
    @Body() createCustomerDto: CreateCustomerDto,
    @UploadedFile() profilePic: Express.Multer.File,
  ) {
    createCustomerDto.profilePic = profilePic?.filename;
    return this.customerService.createCustomer(createCustomerDto);
  }

  @Patch('updatephone/:id')
  updatePhone(@Param('id') id: number, @Body('phone') phone: number) {
    return this.customerService.updatePhoneNumber(id, phone);
  }

  @Get('fullnamenull')
  getCustomerNullFullName() {
    return this.customerService.getCustomerNullFullName();
  }

  @Delete('deletecustomer')
  deleteCustomer(@Query('id', ParseIntPipe) id: number) {
    return this.customerService.deleteCustomer(id);
  }
}
