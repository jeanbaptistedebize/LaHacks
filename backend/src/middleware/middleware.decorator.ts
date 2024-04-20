import { SetMetadata } from '@nestjs/common';

export const MIDDLEWARE_KEY = 'allow';
export const LoggedMiddleware = (allow = false) =>
  SetMetadata(MIDDLEWARE_KEY, allow);
