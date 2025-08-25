import {
	registerDecorator,
	ValidationArguments,
	validate,
} from 'class-validator';
import {
	validateCpfDigit,
	validateCnpjDigit,
} from '../../shared/utilities/validator-digit.utilities';
import { ValidatorOptionsCustom } from './interfaces/validator-options.interface';

export function IsCPF(options?: ValidatorOptionsCustom) {
	return function (object: any, propertyName: string) {
		registerDecorator({
			name: 'isCPF',
			target: object.constructor,
			propertyName,
			options,
			validator: {
				validate(value: any) {
					if (!value) return true; // opcional
					const onlyDigits = value.replace(/\D/g, '');
					return options?.lengthOnly
						? onlyDigits.length === 11
						: validateCpfDigit(value);
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

export function IsCNPJ(options?: ValidatorOptionsCustom) {
	return function (object: any, propertyName: string) {
		registerDecorator({
			name: 'isCNPJ',
			target: object.constructor,
			propertyName,
			options,
			validator: {
				validate(value: any) {
					if (!value) return true; // opcional
					const onlyDigits = value.replace(/\D/g, '');
					return options?.lengthOnly
						? onlyDigits.length === 14
						: validateCnpjDigit(value);
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

export async function validateBrazilianDocs(object: any): Promise<string[]> {
	const errors = await validate(object);
	return errors.map((error) => {
		if (error.constraints) {
			const firstConstraint = Object.keys(error.constraints)[0];
			return error.constraints[firstConstraint];
		}
		return `Property "${error.property}" failed validation`;
	});
}
