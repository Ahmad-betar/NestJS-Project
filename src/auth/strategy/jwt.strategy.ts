import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/users/entity/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        '9c20d298fd78ae563d5210e821a021f3717519f38ddbdc0cb7073977971d8acf',
    });
  }
  l;

  async validate(payload: User) {
    return {
      id: payload.id,
      email: payload.email,
      name: payload.name,
    };
  }
}
