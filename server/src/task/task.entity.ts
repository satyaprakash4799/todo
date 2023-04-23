import { Project } from 'src/project/project.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity('task')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 20,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  description: string;

  @Column({
    type: 'date',
  })
  dueDate: Date;

  @Column({
    type: 'varchar',
    length: 20,
  })
  priority: string;

  @ManyToOne(() => Project, (project) => project.tasks, {
    eager: false,
    onDelete: 'CASCADE',
  })
  project: Project;

  @Column({
    type: Boolean,
    default: false,
  })
  completed: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
