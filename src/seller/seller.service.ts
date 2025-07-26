import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create.product.dto';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateProductDto } from './dto/update.product.dto';
import { CreateSellerDto } from './dto/create.seller.dto';

@Injectable()
export class SellerService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  //👉 Seller-related methods
  creareSeller(createSellerDto: CreateSellerDto): CreateSellerDto {
    return createSellerDto;
  }

  //👉 Product-related methods
  getProducts(): Promise<Product[]> {
    return this.productRepository.find({ order: { productId: 'ASC' } });
  }

  async getImagesByProductId(
    productId: number,
  ): Promise<{ url: string; filename: string }[]> {
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

  async updateProduct(
    productId: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productRepository.findOneBy({ productId });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    await this.productRepository.update(productId, updateProductDto);

    const updatedProduct = await this.productRepository.findOneBy({
      productId,
    });

    if (!updatedProduct) {
      throw new NotFoundException('Updated product not found');
    }

    return updatedProduct;
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return await this.productRepository.save(product);
  }

  async deleteProductById(productId: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({ productId });
    if (!product) {
      throw new Error('Product not found');
    }
    return this.productRepository.remove(product);
  }
}
