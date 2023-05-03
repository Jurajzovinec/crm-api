import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator
} from 'class-validator';
import * as libPhoneNumber from 'google-libphonenumber';

@ValidatorConstraint({ name: 'phoneNumberValidator' })
@Injectable()
export class PhoneNumberValidator implements ValidatorConstraintInterface {
  public defaultMessage(): string {
    return 'Phone number is invalid';
  }

  public validate(phone: string) {
    const libPhoneNumberInstance = libPhoneNumber.PhoneNumberUtil.getInstance();

    let parsedPhoneNumber = null;
    try {
      parsedPhoneNumber = libPhoneNumberInstance.parse(phone);
    } catch (error) {
      if (error.message?.includes('The string supplied did not seem to be a phone number')) {
        return false;
      }
      if (error.message?.includes('Invalid country calling code')) {
        return false;
      }
      throw new InternalServerErrorException(error);
    }

    return libPhoneNumberInstance.isValidNumber(parsedPhoneNumber);
  }
}

export function IsPhoneNumberValid(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: PhoneNumberValidator
    });
  };
}
