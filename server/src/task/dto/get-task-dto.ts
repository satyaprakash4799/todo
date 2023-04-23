import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetTaskDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
