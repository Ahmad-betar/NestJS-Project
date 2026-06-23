import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getFuck() {
    return 'FUck';
  }

  getAss() {
    return 'ASS';
  }
}
