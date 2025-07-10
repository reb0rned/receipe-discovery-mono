import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ValidationPipe, UsePipes } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  create(
    @Request() req,
    @Body() createRecipeDto: CreateRecipeDto) {
    return this.recipesService.create(+req.user.id, createRecipeDto);
  }

  @Get()
  findAll() {
    return this.recipesService.findAll();
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAllByUser(
    @Request() req
  ) {
    return this.recipesService.findAllByUser(+req.user.id)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  update(
    @Param('id') id: string, 
    @Body() updateRecipeDto: UpdateRecipeDto,
    @Request() req
    ) {
    return this.recipesService.update(+id, updateRecipeDto, +req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(
    @Param('id') id: string,
    @Request() req
    ) {
    return this.recipesService.remove(+id, +req.user.id);
  }
}
