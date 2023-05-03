import { CreateLeadDto } from './create-lead.input.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateLeadDto extends PartialType(CreateLeadDto) {}
