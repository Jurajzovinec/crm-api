import { Lead } from '@prisma/client';
import { LEAD_SOURCES, LEAD_STATUSES } from '../leads.types';
import { IsIn, IsOptional } from 'class-validator';

export class GetLeadsInputDto implements Partial<Pick<Lead, 'source' | 'status'>> {
  @IsOptional()
  @IsIn(LEAD_SOURCES, { message: `source must be on of Lead sources (${LEAD_SOURCES})` })
  public readonly source?: Lead['source'];

  @IsOptional()
  @IsIn(LEAD_STATUSES, { message: `status must be on of Lead statuses (${LEAD_STATUSES})` })
  public readonly status?: Lead['status'];
}
