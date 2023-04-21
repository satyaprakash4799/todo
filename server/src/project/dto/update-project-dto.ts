import {
  IsNotEmpty,
  IsOptional,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateProjectDto {
  @IsOptional()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  name: string;

  @IsOptional()
  @MinLength(5)
  @MaxLength(255)
  description: string;
}
