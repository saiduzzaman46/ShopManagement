import { SelectQueryBuilder } from 'typeorm';
import { Seller } from '../seller/entity/create.seller.entity';

export class SellerQueryBuilder {
  constructor(
    private queryBuilder: SelectQueryBuilder<Seller>,
    private queryParams: any,
  ) {}

  filter(): this {
    const excludeFields = ['page', 'limit', 'sort', 'fields'];
    const filters = { ...this.queryParams };

    excludeFields.forEach((field) => delete filters[field]);

    for (const key in filters) {
      if (filters[key]) {
        this.queryBuilder.andWhere(`seller.${key} LIKE :${key}`, {
          [key]: `%${filters[key]}%`,
        });
      }
    }

    return this;
  }

  sort(): this {
    if (this.queryParams.sort) {
      const sortFields = this.queryParams.sort
        .split(',')
        .map((field) => `seller.${field}`);
      sortFields.forEach((field) => {
        this.queryBuilder.addOrderBy(field, 'ASC');
      });
    } else {
      this.queryBuilder.addOrderBy('seller.id', 'DESC');
    }
    return this;
  }

  selectFields(): this {
    if (this.queryParams.fields) {
      const fields = this.queryParams.fields
        .split(',')
        .map((field) => `seller.${field}`);
      this.queryBuilder.select(fields);
    }
    return this;
  }

  paginate(): this {
    const page = +this.queryParams.page || 1;
    const limit = +this.queryParams.limit || 10;
    const skip = (page - 1) * limit;

    this.queryBuilder.skip(skip).take(limit);
    return this;
  }

  build(): SelectQueryBuilder<Seller> {
    return this.queryBuilder;
  }
}
