import { Exclude } from 'class-transformer';
import { Project } from 'src/project/project.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 20,
    unique: true,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  @Exclude()
  password: string;

  @Column({
    unique: true,
    type: 'varchar',
    length: 50,
  })
  email: string;

  @OneToMany((_type) => Project, (project) => project.user, { eager: false })
  projects: Project[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
