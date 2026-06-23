import { Injectable, NotFoundException } from '@nestjs/common';
import { createTaskDto } from './dto/create-task.dto';
import { updateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entity/task.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
    private readonly usersService: UsersService,
  ) {}

  getAll() {
    return this.tasksRepository.find({ relations: ['user'] });
  }

  async findOne(id: number) {
    const task = await this.tasksRepository.findOne({ where: { id } });

    if (!task) throw new NotFoundException('Task Not found');

    return task;
  }

  async createOne(createTask: createTaskDto) {
    const task = this.tasksRepository.create(createTask);

    await this.tasksRepository.save(task);

    return task;
  }

  async update(id: number, updateTaskDto: updateTaskDto) {
    let task = await this.findOne(id);
    let user = await this.usersService.findOne(updateTaskDto.userId);

    if (!task) throw new NotFoundException('Task Not Found');

    if (!user) throw new NotFoundException('User Not Found');

    task.title = updateTaskDto.title;
    task.completed = updateTaskDto.completed;
    task.user = user;

    return this.tasksRepository.save(task);
  }

  async removeCompletedTasks() {
    const completed = await this.tasksRepository.find({
      where: { completed: true },
    });

    await this.tasksRepository.remove(completed);

    return completed;
  }
}
