import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import boxpiConfig from '../config/boxpi.config';
import { LeadsModule } from '../api/leads/leads.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [boxpiConfig],
      cache: true
    }),
    LeadsModule
  ]
})
export class AppModule {}
