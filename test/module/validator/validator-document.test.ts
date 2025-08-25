import 'reflect-metadata';
import { test } from 'poku';
import { strict as assert } from 'assert';
import { validateBrazilianDocs, IsCPF, IsCNPJ } from '../../../src/index';

test('validateBrazilianDocs - should validate valid CPF', async () => {
	class TestClass {
		@IsCPF()
		cpf!: string;
	}

	const obj = new TestClass();
	obj.cpf = '11144477735';

	const errors = await validateBrazilianDocs(obj);
	assert.strictEqual(errors.length, 0);
});

test('validateBrazilianDocs - should return error for invalid CPF', async () => {
	class TestClass {
		@IsCPF()
		cpf!: string;
	}

	const obj = new TestClass();
	obj.cpf = '11144477736';

	const errors = await validateBrazilianDocs(obj);
	assert.strictEqual(errors.length, 1);
	assert.strictEqual(errors[0], 'cpf is not a valid CPF');
});

test('validateBrazilianDocs - should use custom error message for CPF', async () => {
	class TestClass {
		@IsCPF({ message: 'CPF inválido!' })
		cpf!: string;
	}

	const obj = new TestClass();
	obj.cpf = '11144477736';

	const errors = await validateBrazilianDocs(obj);
	assert.strictEqual(errors.length, 1);
	assert.strictEqual(errors[0], 'CPF inválido!');
});

test('validateBrazilianDocs - should validate CPF length only when lengthOnly option is true', async () => {
	class TestClass {
		@IsCPF({ lengthOnly: true })
		cpf!: string;
	}

	const obj = new TestClass();
	obj.cpf = '11144477736';

	const errors = await validateBrazilianDocs(obj);
	assert.strictEqual(errors.length, 0);
});

test('validateBrazilianDocs - should validate valid CNPJ', async () => {
	class TestClass {
		@IsCNPJ()
		cnpj!: string;
	}

	const obj = new TestClass();
	obj.cnpj = '11222333000181';

	const errors = await validateBrazilianDocs(obj);
	assert.strictEqual(errors.length, 0);
});

test('validateBrazilianDocs - should return error for invalid CNPJ', async () => {
	class TestClass {
		@IsCNPJ()
		cnpj!: string;
	}

	const obj = new TestClass();
	obj.cnpj = '11222333000182';

	const errors = await validateBrazilianDocs(obj);
	assert.strictEqual(errors.length, 1);
	assert.strictEqual(errors[0], 'cnpj is not a valid CNPJ');
});

test('validateBrazilianDocs - should validate multiple properties', async () => {
	class TestClass {
		@IsCPF()
		cpf!: string;

		@IsCNPJ()
		cnpj!: string;
	}

	const obj = new TestClass();
	obj.cpf = '11144477735';
	obj.cnpj = '11222333000181';

	const errors = await validateBrazilianDocs(obj);
	assert.strictEqual(errors.length, 0);
});

test('validateBrazilianDocs - should return multiple errors for invalid properties', async () => {
	class TestClass {
		@IsCPF({ message: 'CPF error' })
		cpf!: string;

		@IsCNPJ({ message: 'CNPJ error' })
		cnpj!: string;
	}

	const obj = new TestClass();
	obj.cpf = '11144477736';
	obj.cnpj = '11222333000182';

	const errors = await validateBrazilianDocs(obj);
	assert.strictEqual(errors.length, 2);
	assert.strictEqual(errors[0], 'CPF error');
	assert.strictEqual(errors[1], 'CNPJ error');
});

test('validateBrazilianDocs - should handle object without decorators', async () => {
	class TestClass {
		regularProperty!: string;
	}

	const obj = new TestClass();
	obj.regularProperty = 'test';

	const errors = await validateBrazilianDocs(obj);
	assert.strictEqual(errors.length, 0);
});
