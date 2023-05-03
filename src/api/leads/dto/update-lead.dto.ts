import { CreateLeadDto } from './create-lead.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateLeadDto extends PartialType(CreateLeadDto) {}
