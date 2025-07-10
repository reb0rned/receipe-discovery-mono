import { User } from '../../user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  ingredients: string;

  @Column({ type: 'text' })
  instructions: string;

  @Column({ type: 'float', default: 0 })
  averageRating: number;

  @ManyToOne(() => User, (user) => user.recipes, {
    onDelete: 'CASCADE',
  })
  author: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
