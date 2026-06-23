import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entity/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly JwtService: JwtService,
  ) {}

  async getToken(user: User) {
    const { passwordHash, tasks, ...payload } = user;

    const accessToken = await this.JwtService.signAsync(payload);

    return { accessToken, user: payload };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmailWithPassword(
      loginDto.email,
    );

    const isMatch = await bcrypt.compare(loginDto.password, user.passwordHash);

    if (!isMatch) throw new UnauthorizedException('Not Authorized');

    return this.getToken(user);
  }

  async register(registerDto: RegisterDto) {
    const hashed = await bcrypt.hash(registerDto.password, 10);
    await this.usersService.create({
      ...registerDto,
      passwordHash: hashed,
    });

    const login = await this.login({
      email: registerDto.email,
      password: registerDto.password,
    });

    return login;
  }
}
