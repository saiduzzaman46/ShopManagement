import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Category } from './entity/categories.entity';
import { Brand } from './entity/brand.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Brand]), AuthModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
