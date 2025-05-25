import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
