import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../database';
import { Directive, Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
@Directive(`@key(fields: "id")`)
export class Role extends AbstractEntity<Role> {
  @Column()
  @Field()
  @Directive(`@shareable`)
  name: string;
}
