import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Publication } from '../../posts/entities/post.entity';
import { Token } from '../../token/entities/token.entity';

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  firstname: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  age: number;

  @Column({ type: 'text', default:"", nullable: false})
  description: string;

  @Column({ default: true , select: false})
  profilPublic: boolean;

  @OneToMany(() => Publication, (publication) => publication.user)
  publication: Publication[];

  @OneToMany(() => Token, (token) => token.user)
  tokens: Token[];
}

