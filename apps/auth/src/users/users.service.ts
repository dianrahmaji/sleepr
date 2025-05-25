import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    await this.validateCreateUser(createUserDto);

    return this.prismaService.user.create({
      data: {
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password, 10),
        roles: createUserDto.roles,
      },
    });
  }

  async verifyUser(email, password) {
    const user = await this.prismaService.user.findFirstOrThrow({
      where: { email },
    });
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }

    return user;
  }

  private async validateCreateUser({ email }: CreateUserDto) {
    try {
      await this.prismaService.user.findFirstOrThrow({
        where: { email },
      });
    } catch {
      return;
    }

    throw new UnprocessableEntityException('Email already exists.');
  }

  async getUser({ id }: GetUserDto) {
    return this.prismaService.user.findUniqueOrThrow({
      where: { id: id },
    });
  }

  async findAll() {
    return this.prismaService.user.findMany();
  }
}
