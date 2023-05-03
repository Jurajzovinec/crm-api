import { registerAs } from '@nestjs/config';

export interface BoxPiConfig {
  apiKey: string;
}

export default registerAs(
  'boxPi',
  (): BoxPiConfig => ({
    apiKey: process.env.BOX_PI_API_KEY || ''
  })
);
