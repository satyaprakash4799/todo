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
    type: 'timestamp',
  })
  dueDate: Date;

  @Column({
    type: 'varchar',
    length: 20,
  })
  priority: string;

  @ManyToOne(() => Project, (project) => project.tasks, { eager: false })
  project: Project;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
