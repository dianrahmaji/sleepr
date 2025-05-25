import {
  Args,
  Mutation,
  Resolver,
  Query,
  ObjectType,
  Field,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AbstractEntity } from '@app/common';

@ObjectType()
export class User extends AbstractEntity<User> {
  @Field()
  email: string;

  password: string;

  @Field(() => [String])
  roles: string[];
}

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserDto) {
    return this.userService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.userService.findAll();
  }
}
