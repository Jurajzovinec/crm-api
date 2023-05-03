import { Module } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';
import { PrismaModule } from '../../providers/prisma/prisma.module';
import { PhoneNumberValidator } from './decorators/phone-number.validator';

@Module({
  imports: [PrismaModule],
  controllers: [LeadsController],
  providers: [LeadsService, PhoneNumberValidator]
})
export class LeadsModule {}
