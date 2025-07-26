import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create.product.dto';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateProductDto } from './dto/update.product.dto';

@Injectable()
export class SellerService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  getProducts() {
    return this.productRepository.find({ order: { productId: 'ASC' } });
  }

  async getImagesByProductId(productId: number) {
    const product = await this.productRepository.findOne({
      where: { productId },
      select: ['productId', 'images'],
    });

    if (!product) {
      throw new Error('Product not found');
    }

    return (product.images ?? []).map((image) => ({
      url: `/uploads/${image}`,
      filename: image,
    }));
  }

  async updateProduct(productId: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOneBy({ productId });
    if (!product) {
      throw new Error('Product not found');
    }

    Object.assign(product, updateProductDto);
    return this.productRepository.save(product);
  }

  createProduct(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }
}
