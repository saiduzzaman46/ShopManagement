import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateSellerDto } from './dto/create.seller.dto';
import { Seller } from './entity/create.seller.entity';
import * as bcrypt from 'bcrypt';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class SellerService {
  constructor(
    @InjectRepository(Seller)
    private readonly sellerRepository: Repository<Seller>,
  ) {}

  //👉 Seller-related methods
  async singnupSeller(createSellerDto: CreateSellerDto): Promise<Seller> {
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(
      createSellerDto.password,
      saltRounds,
    );

    const seller = this.sellerRepository.create({
      ...createSellerDto,
      password: hashedPassword,
    });
    return this.sellerRepository.save(seller);
  }

  async getFilteredSellers(query: any): Promise<any> {
    // const queryObj = { ...query };
    let sellers = await this.sellerRepository.find();
    // find by fullName
    if (query.fullName) {
      sellers = await this.sellerRepository.find({
        where: {
          fullName: ILike(`%${query.fullName}%`),
        },
      });
    }
    // find by username
    if (query.username) {
      sellers = await this.sellerRepository.find({
        where: { username: ILike(query.username) },
      });
    }
    return instanceToPlain(sellers);
  }

  async deleteSellerByUsername(username: string): Promise<boolean> {
    const seller = await this.sellerRepository.findOneBy({ username });

    if (!seller) return false;

    await this.sellerRepository.remove(seller);
    return true;
  }
}
