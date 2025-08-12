import { Module } from '@nestjs/common';
// import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { AuthMailerModule } from './mailer.module';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    AuthMailerModule,
  ],
  exports: [TypeOrmModule, AuthService],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
