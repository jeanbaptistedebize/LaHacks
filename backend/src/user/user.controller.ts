import { OllContext } from 'context/context.decorator';
import { LoggedMiddleware } from 'middleware/middleware.decorator';
import SessionService from 'redis/session/session.service';
import {
  CreateUserModel,
  GetUserModel,
  LoginUserModel,
  UserIdResponse,
  UserTrueResponse,
} from 'user/user.dto';
import { UserService } from 'user/user.service';

import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  Response,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCookieAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBadRequestResponse({ description: 'Parameters are not valid' })
@ApiTags('User')
@ApiForbiddenResponse({
  description: 'User does not have permission to execute this action',
})
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiCookieAuth()
  @ApiOkResponse({
    description: "user's token",
    type: UserTrueResponse,
  })
  @ApiBody({
    type: CreateUserModel,
    description: 'user data model',
    examples: {
      template: {
        value: {
          firstname: 'name',
          lastname: 'lastname',
          email: 'test@test.test',
          password: '1234aaBB@',
        } as CreateUserModel,
      },
    },
  })
  @Post('/register')
  async registerUser(
    @Req() request,
    @Response() res,
    @Body() body: CreateUserModel,
  ) {
    const cookiesParams = { httpOnly: true, maxAge: SessionService.TTL };
    res.cookie(
      'session',
      await this.userService.registerUser(body),
      cookiesParams,
    );
    return res.send({ success: true });
  }

  @ApiCookieAuth()
  @ApiOkResponse({
    description: 'true',
    type: UserTrueResponse,
  })
  @ApiBody({
    type: LoginUserModel,
    description: 'user data model',
    examples: {
      template: {
        value: {
          email: 'test@test.test',
          password: '1234aaBB@',
        } as LoginUserModel,
      },
    },
  })
  @Post('/login')
  async loginUser(
    @Req() request,
    @Response() res,
    @Body() body: LoginUserModel,
  ): Promise<any> {
    const cookiesParams = { httpOnly: true, maxAge: SessionService.TTL };
    res.cookie(
      'session',
      await this.userService.loginUser(body),
      cookiesParams,
    );
    return res.send({ success: true });
  }

  @ApiOkResponse({
    description: "user's data",
    type: GetUserModel,
  })
  @LoggedMiddleware(true)
  @Get()
  async getUser(@OllContext() ctx: any): Promise<GetUserModel> {
    return this.userService.getUser(ctx);
  }

  @ApiOkResponse({
    description: 'Ok.',
    type: UserIdResponse,
  })
  @LoggedMiddleware(true)
  @Delete()
  async deleteUser(@OllContext() ctx: any): Promise<UserIdResponse> {
    return this.userService.deleteUser(ctx);
  }
}
