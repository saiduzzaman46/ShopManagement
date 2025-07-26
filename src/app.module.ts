import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { SellerController } from './seller/seller.controller';
import { SellerModule } from './seller/seller.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';

@Module({
  imports: [AdminModule, UserModule],
  controllers: [UserController],
  providers: [],
})
export class AppModule {}
