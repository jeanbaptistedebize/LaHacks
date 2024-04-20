import { UserController } from 'user/user.controller';
import { UserService } from 'user/user.service';

import { Module } from '@nestjs/common';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
