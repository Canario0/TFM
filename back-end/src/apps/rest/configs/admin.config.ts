import { registerAs } from '@nestjs/config';

export const adminConfig = registerAs('admin', () => ({
  username: process.env.ADMIN_USERNAME,
  password: process.env.ADMIN_PASSWORD,
}));
