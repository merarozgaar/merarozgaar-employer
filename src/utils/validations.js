// @flow
import validator from 'validator';

export function isValidEmail(email: string): boolean {
  return validator.isEmail(email);
}

export function isValidMobileNumber(number: string): boolean {
  return validator.isMobilePhone(number, ['en-IN']);
}

export function isValidDate(date: string | Object): boolean {
  return validator.isDate(date);
}

export function isValidURL(url: string): boolean {
  return validator.isURL(url);
}
