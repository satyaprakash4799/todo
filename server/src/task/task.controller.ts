import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTaskDto } from './dto/get-task-dto';
import { UpdateTaskDto } from './dto/update-task-dto';
import { GetUser } from 'src/auth/decorators/get-user-decorator';
import { User } from 'src/user/user.entity';
import { Task } from './task.entity';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.createTask(createTaskDto, user);
  }

  @Get(':id')
  getTask(@Param() getTaskDto: GetTaskDto, @GetUser() user: User) {
    const { id } = getTaskDto;
    return this.taskService.getTask(id, user);
  }

  @Get()
  getTasks(@GetUser() user: User): Promise<Task[]> {
    return this.taskService.getTasks(user);
  }
  @Put(':id')
  updateTask(
    @Param() getTaskDto: GetTaskDto,
    @Body() updateTaskDto: UpdateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    const { id } = getTaskDto;
    return this.taskService.updateTask(id, updateTaskDto, user);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteTask(
    @Param() getTaskDto: GetTaskDto,
    @GetUser() user: User,
  ): Promise<void> {
    const { id } = getTaskDto;
    return this.taskService.deleteTask(id, user);
  }
}
