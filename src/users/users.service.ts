import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';

type SafeUser = Omit<User, 'passwordHash'>;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  findAll() {
    return this.usersRepository.find({
      order: {
        id: 'ASC',
      },
      relations: { tasks: true },
    });
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async findByEmailWithPassword(email: string) {
    const user = await this.usersRepository.findOne({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        passwordHash: true,
        tasks: true,
      },
      relations: { tasks: true },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${email} not found`);
    }

    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.usersRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const user = this.usersRepository.create(createUserDto);

    return this.usersRepository.save(user);
  }

  async findOneWithTasks(id: number) {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
      relations: { tasks: true },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async findOneWithCompletedTasks(id: number) {
    const user = await this.findOne(id);

    if (!user.tasks) throw new NotFoundException('There is No tasks');

    user.tasks.filter((task) => task.completed);

    return user;
  }

  async removeUser(id: number) {
    const user = await this.findOne(id);

    return this.usersRepository.remove(user);
  }
}
