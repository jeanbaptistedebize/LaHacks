import { get } from 'env-var';
import { config } from 'dotenv';
import { Logger } from '@nestjs/common';
config({ path: './.env' });

export const SECRET_KEY: string = get('SECRET_KEY').required().asString();
export const BACKEND_PORT: number = get('BACKEND_PORT')
  .required()
  .asPortNumber();
export const FRONTEND_URL: string = get('FRONTEND_URL').required().asString();
export const FRONTEND_PORT: number = get('FRONTEND_PORT')
  .required()
  .asPortNumber();
export const MODE: string = get('MODE').required().default('dev').asString();
export const REDIS_HOST = get('REDIS_HOST').required().asString();
export const REDIS_PORT = get('REDIS_PORT').required().asPortNumber();
export const REDIS_PASSWORD = get('REDIS_PASSWORD').required().asString();
export const REDIS_USERNAME = get('REDIS_USERNAME').required().asString();

Logger.log(`Env variables Loaded`);
