import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export class AbstractEntity<T> {
  @Field(() => Number)
  id: number;

  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }
}
