import { Task } from 'src/tasks/entity/task.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @Column({ name: 'password_hash', select: false })
  passwordHash!: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks!: Task[];
}
