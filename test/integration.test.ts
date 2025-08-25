import 'reflect-metadata';
import { test } from 'poku';
import { strict as assert } from 'assert';
import { IsCPF, IsCNPJ, validateBrazilianDocs } from '../src/index';

test('Integration - should validate a complete user object with CPF and CNPJ', async () => {
	class User {
		@IsCPF({ message: 'CPF é obrigatório e deve ser válido' })
		cpf!: string;

		@IsCNPJ({ message: 'CNPJ é obrigatório e deve ser válido' })
		cnpj!: string;

		name!: string;
	}

	// Valid user
	const validUser = new User();
	validUser.cpf = '111.444.777-35';
	validUser.cnpj = '11.222.333/0001-81';
	validUser.name = 'Test User';

	const validationErrors = await validateBrazilianDocs(validUser);
	assert.strictEqual(validationErrors.length, 0);

	// Invalid user
	const invalidUser = new User();
	invalidUser.cpf = '111.444.777-36'; // Invalid CPF
	invalidUser.cnpj = '11.222.333/0001-82'; // Invalid CNPJ
	invalidUser.name = 'Test User';

	const invalidationErrors = await validateBrazilianDocs(invalidUser);
	assert.strictEqual(invalidationErrors.length, 2);
	assert.strictEqual(
		invalidationErrors[0],
		'CPF é obrigatório e deve ser válido',
	);
	assert.strictEqual(
		invalidationErrors[1],
		'CNPJ é obrigatório e deve ser válido',
	);
});

test('Integration - should handle mixed validation scenarios', async () => {
	class Company {
		@IsCPF({ lengthOnly: true })
		responsibleCpf!: string;

		@IsCNPJ()
		companyCnpj!: string;
	}

	const company = new Company();
	company.responsibleCpf = '11144477736'; // Invalid CPF but valid length
	company.companyCnpj = '11222333000181'; // Valid CNPJ

	const errors = await validateBrazilianDocs(company);
	assert.strictEqual(errors.length, 0); // CPF passes with lengthOnly: true
});

test('Integration - should validate real-world document formats', async () => {
	class DocumentTest {
		@IsCPF()
		cpfFormatted!: string;

		@IsCPF()
		cpfUnformatted!: string;

		@IsCNPJ()
		cnpjFormatted!: string;

		@IsCNPJ()
		cnpjUnformatted!: string;
	}

	const test = new DocumentTest();
	test.cpfFormatted = '529.982.247-25';
	test.cpfUnformatted = '52998224725';
	test.cnpjFormatted = '34.028.316/0001-03';
	test.cnpjUnformatted = '34028316000103';

	const errors = await validateBrazilianDocs(test);
	assert.strictEqual(errors.length, 0);
});

test('Integration - should handle edge cases', async () => {
	class EdgeCaseTest {
		@IsCPF({ message: 'CPF com todos os dígitos iguais não é válido' })
		cpfAllSame!: string;

		@IsCNPJ({ message: 'CNPJ com todos os dígitos iguais não é válido' })
		cnpjAllSame!: string;
	}

	const test = new EdgeCaseTest();
	test.cpfAllSame = '111.111.111-11';
	test.cnpjAllSame = '11.111.111/1111-11';

	const errors = await validateBrazilianDocs(test);
	assert.strictEqual(errors.length, 2);
	assert.strictEqual(errors[0], 'CPF com todos os dígitos iguais não é válido');
	assert.strictEqual(
		errors[1],
		'CNPJ com todos os dígitos iguais não é válido',
	);
});
