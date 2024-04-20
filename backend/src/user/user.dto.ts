import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  IsBoolean,
} from 'class-validator';

export class UserModel {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  firstname: string;

  @ApiProperty()
  @IsString()
  lastname: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class CreateUserModel {
  @ApiProperty()
  @IsString()
  firstname: string;

  @ApiProperty()
  @IsString()
  lastname: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class LoginUserModel {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class UpdateUserModel {
  @ApiProperty()
  @IsOptional()
  firstname?: string;

  @ApiProperty()
  @IsOptional()
  lastname?: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  password?: string;
}

export class GetUserModel {
  @ApiProperty()
  @IsString()
  firstname: string;

  @ApiProperty()
  @IsString()
  lastname: string;

  @ApiProperty()
  @IsEmail()
  email: string;
}

export class UserIdResponse {
  @ApiProperty()
  @IsUUID()
  id: string;
}

export class UserTrueResponse {
  @ApiProperty()
  @IsBoolean()
  success: boolean;
}