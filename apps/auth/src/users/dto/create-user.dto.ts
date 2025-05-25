import { IsEmail } from '@nestjs/class-validator';
import { IsOptional, IsStrongPassword } from 'class-validator';
import { Type } from 'class-transformer';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @IsEmail()
  @Field()
  email: string;

  @IsStrongPassword()
  @Field()
  password: string;

  @IsOptional()
  @Type(() => String)
  @Field(() => [String])
  roles: string[];
}
