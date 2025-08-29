import { registerDecorator, ValidationArguments } from 'class-validator';
import { validateCpfDigit } from './cpf.validator';
import { CPFOptions } from './cpf.types';

export function IsCPF(options?: CPFOptions) {
	return function (object: any, propertyName: string) {
		registerDecorator({
			name: 'isCPF',
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
					if (onlyDigits.length !== 11) return false;
					if (options?.skipDigitValidation) {
						return true;
					}
					if (
						!options?.allowKnownInvalid &&
						/^([0-9])\1{10}$/.test(onlyDigits)
					) {
						return false;
					}
					return validateCpfDigit(cleanValue);
				},
				defaultMessage(args: ValidationArguments) {
					if (!options?.message) return `${args.property} is not a valid CPF`;
					return typeof options.message === 'string'
						? options.message
						: options.message(args);
				},
			},
		});
	};
}
