import { Field, ObjectType } from '@nestjs/graphql';
import { PrimaryGeneratedColumn } from 'typeorm';

@ObjectType({ isAbstract: true })
export class AbstractEntity<T> {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  id: number;

  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }
}
