import { ApiProperty } from '@nestjs/swagger';
import { Lead } from '@prisma/client';
import { IsEmail, IsIn, IsString, MaxLength } from 'class-validator';
import { LEAD_SOURCES, LEAD_STATUSES } from '../leads.types';
import { IsPhoneNumberValid } from '../decorators/phone-number.validator';

export class CreateLeadDto implements Omit<Lead, 'id'> {
  @ApiProperty()
  @IsString({ message: 'firstName must be a string' })
  @MaxLength(50, { message: 'firstName must be shorter than or equal to 50 characters' })
  public readonly firstName: string;

  @ApiProperty()
  @IsString({ message: 'lastName must be a string' })
  @MaxLength(50, { message: 'lastName must be shorter than or equal to 50 characters' })
  public readonly lastName: string;

  @ApiProperty()
  @IsEmail({}, { message: 'email must be a valid email' })
  @MaxLength(50, { message: 'email must be shorter than or equal to 50 characters' })
  public readonly email: string;

  @ApiProperty()
  @IsString({ message: 'phone must be a string' })
  @MaxLength(50, { message: 'phone must be shorter than or equal to 50 characters' })
  @IsPhoneNumberValid()
  public phone: string;

  @ApiProperty({ enum: LEAD_SOURCES })
  @IsIn(LEAD_SOURCES, { message: `source must be on of Lead sources (${LEAD_SOURCES})` })
  public readonly source: Lead['source'];

  @ApiProperty({ enum: LEAD_STATUSES })
  @IsIn(LEAD_STATUSES, { message: `status must be on of Lead statuses (${LEAD_STATUSES})` })
  public readonly status: Lead['status'];
}
