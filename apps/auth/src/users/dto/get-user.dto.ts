import { IsNotEmpty, IsString } from '@nestjs/class-validator';

export class GetUserDto {
  @IsString()
  @IsNotEmpty()
  _id: string;
}
