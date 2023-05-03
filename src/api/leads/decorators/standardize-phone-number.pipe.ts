import { Injectable, PipeTransform } from '@nestjs/common';
import * as libPhoneNumber from 'google-libphonenumber';
import { CreateLeadDto } from '../dto/create-lead.dto';
import { UpdateLeadDto } from '../dto/update-lead.dto';

@Injectable()
export class StandardizePhoneNumberPipe implements PipeTransform {
  public transform(lead: CreateLeadDto | UpdateLeadDto) {
    if (!lead?.phone) {
      return lead;
    }

    const libPhoneNumberInstance = libPhoneNumber.PhoneNumberUtil.getInstance();
    const phoneNumber = libPhoneNumberInstance.parse(lead.phone);
    lead.phone = libPhoneNumberInstance.format(phoneNumber, libPhoneNumber.PhoneNumberFormat.E164);

    return lead;
  }
}
