import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { ProductService } from './product.service';
import { Brand } from 'src/admin/entity/brand.entity';
import { Category } from 'src/admin/entity/categories.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Seller } from '../entity/create.seller.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Brand, Category, Seller]), AuthModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
