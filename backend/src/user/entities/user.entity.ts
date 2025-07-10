import { Recipe } from "src/recipes/entities/recipe.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string

  @Column()
  password: string

  @OneToMany(() => Recipe, (recipe) => recipe.author, {
    onDelete: 'CASCADE'
  })
  recipes!: Recipe[]


  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
