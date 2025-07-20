import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { SellerController } from './seller/seller.controller';
import { SellerModule } from './seller/seller.module';

@Module({
  imports: [AdminModule, SellerModule],
  controllers: [SellerController],
  providers: [],
})
export class AppModule {}
