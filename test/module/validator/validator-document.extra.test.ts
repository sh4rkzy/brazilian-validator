import 'reflect-metadata';
import { test } from 'poku';
import { strict as assert } from 'assert';
import { validateBrazilianDocs, IsCPF, IsCNPJ } from '../../../src/index';

test('Extra tests - empty and null values', async () => {
	class TestClass {
		@IsCPF()
		cpf!: string;

		@IsCNPJ()
		cnpj!: string;
	}

	const obj = new TestClass();
	obj.cpf = '';
	obj.cnpj = '';

	const errors = await validateBrazilianDocs(obj);
	assert.strictEqual(errors.length, 0); // Empty values should pass (optional validation)
});

test('Extra tests - formatted documents', async () => {
	class TestClass {
		@IsCPF()
		cpf!: string;

		@IsCNPJ()
		cnpj!: string;
	}

	const obj = new TestClass();
	obj.cpf = '111.444.777-35';
	obj.cnpj = '11.222.333/0001-81';

	const errors = await validateBrazilianDocs(obj);
	assert.strictEqual(errors.length, 0);
});

test('Extra tests - lengthOnly option for CNPJ', async () => {
	class TestClass {
		@IsCNPJ({ lengthOnly: true })
		cnpj!: string;
	}

	const obj = new TestClass();
	obj.cnpj = '11222333000182'; // Invalid CNPJ but correct length

	const errors = await validateBrazilianDocs(obj);
	assert.strictEqual(errors.length, 0); // Should pass with lengthOnly option
});
