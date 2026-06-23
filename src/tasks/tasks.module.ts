import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entity/task.entity';
import { User } from 'src/users/entity/user.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  providers: [TasksService, UsersService],
  controllers: [TasksController],
  imports: [TypeOrmModule.forFeature([Task, User])],
})
export class TasksModule {}
