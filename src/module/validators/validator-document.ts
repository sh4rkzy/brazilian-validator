import { validate } from 'class-validator';
export { IsCPF } from './cpf/cpf.decorator';
export { IsCNPJ } from './cnpj/cnpj.decorator';

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
