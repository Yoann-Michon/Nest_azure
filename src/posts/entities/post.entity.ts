import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from './../../users/entities/user.entity';

@Entity('posts')
export class Publication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  fileUrl: string;

  @ManyToOne(() => User, (user) => user.publication, { nullable: false, onDelete: 'CASCADE' })
  user: User;
}
