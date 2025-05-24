import { IsNotEmpty } from '@nestjs/class-validator';
import { IsNumber } from 'class-validator';

export class GetUserDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
