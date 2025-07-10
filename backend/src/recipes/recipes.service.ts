import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Recipe } from './entities/recipe.entity';

@Injectable()
export class RecipesService {
  constructor(
    // @ts-ignore
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
    // @ts-ignore
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}


  async create(userId: number, createRecipeDto: CreateRecipeDto) {
    const user = await this.userRepository.findOne({
      where: { id: userId }
    })

    if (!user) throw new NotFoundException(`Cannot find ${userId} user!`)

    const newRecipe = {
      title: createRecipeDto.title,
      description: createRecipeDto.description,
      ingredients: createRecipeDto.ingredients,
      instructions: createRecipeDto.instructions,
      author: user
    }

    return await this.recipeRepository.save(newRecipe);
  }

  async findAll() {
    const recipes = await this.recipeRepository.find({
      relations: ['author']
    })

    return recipes
  }

  async findAllByUser(userId) {
    const recipes = await this.recipeRepository.find({
      where: { author: { id: userId }},
      relations: ['author']
    })

    return recipes
  }

  async findOne(recipeId: number) {
    const recipe = await this.recipeRepository.findOne({
      where: { id: recipeId }
    })

    if (!recipe) throw new NotFoundException(`Recipe with id ${recipeId} not found`);

    return recipe;
  }

  async update(recipeId: number, updateRecipeDto: UpdateRecipeDto, userId: number) {
    const recipe = await this.recipeRepository.findOne({ 
      where: { 
        id: recipeId,
        author: { id: userId }
      }
    });
    if (!recipe) {
      throw new NotFoundException(`Recipe with id ${recipeId} not found`);
    }
  
    Object.assign(recipe, updateRecipeDto);
    return this.recipeRepository.save(recipe);
  }

  async remove(recipeId: number, userId: number) {
    const recipe = await this.recipeRepository.findOne({
      where: { 
        id: recipeId,
        author: { id: userId }
       },
    });
  
    if (!recipe) {
      throw new NotFoundException('Recipe not found or you dont have permission!');
    }
  
    await this.recipeRepository.remove(recipe);
    return `Recipe:${recipeId} deleted succesfully!`
  }
}
