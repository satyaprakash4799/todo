import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Body,
  Param,
  HttpCode,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { GetUser } from 'src/auth/decorators/get-user-decorator';
import { User } from 'src/user/user.entity';
import { Project } from './project.entity';
import { GetProjectDto } from './dto/get-project-dto';
import { UpdateProjectDto } from './dto/update-project-dto';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post()
  async createProject(
    @Body() createProjectDto: CreateProjectDto,
    @GetUser() user: User,
  ): Promise<Project> {
    return this.projectService.createProject(createProjectDto, user);
  }

  @Get()
  async getProjectList(@GetUser() user: User) {
    return this.projectService.getProjectList(user);
  }

  @Get(':id')
  async getProject(
    @Param() getProjectDto: GetProjectDto,
    @GetUser() user: User,
  ): Promise<Project> {
    const { id } = getProjectDto;
    return this.projectService.getProject(id, user);
  }

  @Put(':id')
  async updateProject(
    @Param() getProjectDto: GetProjectDto,
    @Body() updateProjectDto: UpdateProjectDto,
    @GetUser() user: User,
  ) {
    const { id } = getProjectDto;
    return this.projectService.updateProject(id, updateProjectDto, user);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteProject(
    @Param() getProjectDto: GetProjectDto,
    @GetUser() user: User,
  ) {
    const { id } = getProjectDto;
    return this.projectService.deleteProject(id, user);
  }
}
