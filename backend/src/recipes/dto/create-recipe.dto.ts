import { IsNotEmpty, IsString } from "class-validator";

export class CreateRecipeDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  ingredients: string;

  @IsNotEmpty()
  @IsString()
  instructions: string;
}
