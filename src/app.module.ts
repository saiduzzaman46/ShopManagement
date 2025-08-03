import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { SellerModule } from './seller/seller.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { CustomerModule } from './customer/customer.module';
dotenv.config();

@Module({
  imports: [
    CustomerModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
