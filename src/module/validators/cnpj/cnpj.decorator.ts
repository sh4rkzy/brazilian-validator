import { registerDecorator, ValidationArguments } from 'class-validator';
import { validateCnpjDigit } from './cnpj.validator';
import { CNPJOptions } from './cnpj.types';

export function IsCNPJ(options?: CNPJOptions) {
	return function (object: any, propertyName: string) {
		registerDecorator({
			name: 'isCNPJ',
			target: object.constructor,
			propertyName,
			options,
			validator: {
				validate(value: any) {
					if (!value) return true;
					const cleanValue = options?.removeFormat
						? value.replace(/\D/g, '')
						: value;
					const onlyDigits = cleanValue.replace(/\D/g, '');
					if (onlyDigits.length !== 14) return false;
					if (options?.skipDigitValidation) {
						return true;
					}
					if (
						!options?.allowKnownInvalid &&
						/^([0-9])\1{13}$/.test(onlyDigits)
					) {
						return false;
					}
					return validateCnpjDigit(cleanValue);
				},
				defaultMessage(args: ValidationArguments) {
					if (!options?.message) return `${args.property} is not a valid CNPJ`;
					return typeof options.message === 'string'
						? options.message
						: options.message(args);
				},
			},
		});
	};
}
