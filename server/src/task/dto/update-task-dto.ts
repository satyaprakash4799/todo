import {
  IsBoolean,
  IsDate,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import { TaskPriority } from '../task-priority-enum';

export class UpdateTaskDto {
  @IsOptional()
  @MinLength(5)
  @MaxLength(20)
  name: string;

  @IsOptional()
  @MinLength(5)
  @MaxLength(50)
  description: string;

  @IsOptional()
  @IsDate()
  dueDate: Date;

  @IsOptional()
  priority: TaskPriority;

  @IsOptional()
  @IsBoolean()
  completed: boolean;
}
