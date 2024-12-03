import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Publication } from '../../posts/entities/post.entity';

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

  @Column({select: false})
  password: string;

  @Column()
  age: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: true })
  profilPublic: boolean;

  @OneToMany(() => Publication, (publication) => publication.user)
  publication: Publication[];
}

