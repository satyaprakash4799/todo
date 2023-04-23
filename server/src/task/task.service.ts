import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { CreateTaskDto } from './dto/create-task-dto';
import { ProjectService } from 'src/project/project.service';
import { UpdateTaskDto } from './dto/update-task-dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private projectService: ProjectService,
  ) {}

  async getTask(id: string, user: User) {
    const query = await this.taskRepository.createQueryBuilder('task');
    query
      .leftJoinAndSelect('task.project', 'project')
      .where('task.id = :id', { id: id })
      .andWhere('project.user = :userId', { userId: user.id });

    const task = await query.getOne();

    if (!task) {
      throw new NotFoundException();
    }

    return task;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { name, priority, dueDate, projectId } = createTaskDto;
    let project;
    try {
      project = await this.projectService.getProject(projectId, user);
    } catch (error) {
      return error;
    }
    const task = this.taskRepository.create({
      name,
      priority,
      dueDate,
      project,
    });

    await this.taskRepository.save(task);
    return task;
  }

  async getTasks(user: User): Promise<Task[]> {
    const query = this.taskRepository.createQueryBuilder('task');
    query
      .leftJoinAndSelect('task.project', 'project')
      .andWhere('project.user = :userId', { userId: user.id });

    const tasks = await query.getMany();
    return tasks;
  }

  async updateTask(
    id: string,
    updateTaskDto: UpdateTaskDto,
    user: User,
  ): Promise<Task> {
    let task;
    try {
      task = await this.getTask(id, user);
    } catch (error) {
      return error;
    }
    const { name, completed, description, dueDate, priority } = updateTaskDto;
    if (name) {
      task.name = name;
    }

    if (completed) {
      task.completed = completed;
    }

    if (description) {
      task.description = description;
    }

    if (dueDate) {
      task.dueDate = dueDate;
    }

    if (priority) {
      task.priority = priority;
    }

    try {
      await this.taskRepository.save(task);
      return task;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async deleteTask(id: string, user: User) {
    const task = await this.getTask(id, user);
    const result = await this.taskRepository.delete(task);
    if (result?.affected === 0) {
      throw new NotFoundException();
    }
  }
}
