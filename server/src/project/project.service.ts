import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { User } from '../user/user.entity';
import { UserService } from 'src/user/user.service';
import { GetUserDto } from 'src/auth/dto/get-user-dto';
import { UpdateProjectDto } from './dto/update-project-dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepositoy: Repository<Project>,
    private userService: UserService,
  ) {}

  async createProject(
    createProjectDto: CreateProjectDto,
    getUserDto: GetUserDto,
  ) {
    const user = await this.userService.getUser(getUserDto);
    const { name, description } = createProjectDto;
    const project = this.projectRepositoy.create({
      name: name,
      description: description,
      user: user,
    });

    try {
      await this.projectRepositoy.save(project);
      return project;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getProjectList(user: User) {
    const query = this.projectRepositoy.createQueryBuilder('project');
    query.where({ user });

    try {
      const projects = await query.getMany();
      return projects;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getProject(id: string, user: User): Promise<Project> {
    const query = this.projectRepositoy.createQueryBuilder('project');
    query
      .leftJoinAndSelect('project.tasks', 'tasks')
      .orderBy('tasks.createdAt', 'DESC')
      .limit(1);

    query.where({
      id,
      user,
    });
    const project = await query.getOne();

    if (!project) {
      throw new NotFoundException(`Project with id ${id} is not found.`);
    }
    return project;
  }

  async updateProject(
    id: string,
    updateProjectDto: UpdateProjectDto,
    user: User,
  ): Promise<Project> {
    const { name, description } = updateProjectDto;
    const query = this.projectRepositoy.createQueryBuilder('project');
    query.where({
      id,
      user,
    });
    const project = await query.getOne();

    if (!project) {
      throw new NotFoundException(`Project with id ${id} is not found.`);
    }

    if (name) {
      project.name = name;
    }

    if (description) {
      project.description = description;
    }
    try {
      await this.projectRepositoy.save(project);
      return project;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  async deleteProject(id: string, user: User) {
    const result = await this.projectRepositoy.delete({ id, user });
    if (result?.affected === 0) {
      throw new NotFoundException(`Task with Id ${id} not found`);
    }
  }
}
