import { Task } from 'src/tasks/entity/task.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../enum/user.role';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ name: 'password_hash', select: false })
  passwordHash!: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks!: Task[];

  @Column({ name: 'role', default: Role.USER, enum: Role })
  role!: Role;

  @CreateDateColumn()
  createdAt!: Date;
}
