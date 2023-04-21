import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  name: string;

  @IsOptional()
  @MinLength(5)
  @MaxLength(255)
  description: string;
}
