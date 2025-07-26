import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { SellerController } from './seller/seller.controller';
import { SellerModule } from './seller/seller.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { CustomerController } from './customer/customer.controller';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [AdminModule, UserModule, CustomerModule],
  controllers: [UserController, CustomerController],
  providers: [],
})
export class AppModule {}
