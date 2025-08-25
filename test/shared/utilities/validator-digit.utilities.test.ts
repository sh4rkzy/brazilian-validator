import { test } from 'poku';
import { strict as assert } from 'assert';
import {
	validateDigit,
	validateCpfDigit,
	validateCnpjDigit,
} from '../../../src/shared/utilities/validator-digit.utilities';

test('validateDigit - should return true for valid single digit', () => {
	assert.strictEqual(validateDigit('0'), true);
	assert.strictEqual(validateDigit('5'), true);
	assert.strictEqual(validateDigit('9'), true);
});

test('validateDigit - should return false for invalid single digit', () => {
	assert.strictEqual(validateDigit(''), false);
	assert.strictEqual(validateDigit('10'), false);
	assert.strictEqual(validateDigit('a'), false);
	assert.strictEqual(validateDigit(' '), false);
});

test('validateCpfDigit - should return true for valid CPF numbers', () => {
	assert.strictEqual(validateCpfDigit('12345678909'), true);
});

test('validateCpfDigit - should return false for invalid CPF numbers', () => {
	assert.strictEqual(validateCpfDigit('11144477736'), false);
	assert.strictEqual(validateCpfDigit('111.444.777-36'), false);
	assert.strictEqual(validateCpfDigit('52998224726'), false);

	assert.strictEqual(validateCpfDigit('11111111111'), false);
	assert.strictEqual(validateCpfDigit('000.000.000-00'), false);
	assert.strictEqual(validateCpfDigit('99999999999'), false);

	assert.strictEqual(validateCpfDigit('1234567890'), false);
	assert.strictEqual(validateCpfDigit('123456789012'), false);
	assert.strictEqual(validateCpfDigit(''), false);

	assert.strictEqual(validateCpfDigit('1114447773a'), false);
	assert.strictEqual(validateCpfDigit('abc.def.ghi-jk'), false);
});

test('validateCpfDigit - should handle CPF with formatting', () => {
	assert.strictEqual(validateCpfDigit('111.444.777-35'), true);
	assert.strictEqual(validateCpfDigit('111 444 777 35'), true);
	assert.strictEqual(validateCpfDigit('111-444-777-35'), true);
});

test('validateCnpjDigit - should return true for valid CNPJ numbers', () => {
	assert.strictEqual(validateCnpjDigit('11222333000181'), true);
	assert.strictEqual(validateCnpjDigit('11.222.333/0001-81'), true);
	assert.strictEqual(validateCnpjDigit('34028316000103'), true);
	assert.strictEqual(validateCnpjDigit('34.028.316/0001-03'), true);
});

test('validateCnpjDigit - should return false for invalid CNPJ numbers', () => {
	assert.strictEqual(validateCnpjDigit('11222333000182'), false);
	assert.strictEqual(validateCnpjDigit('11.222.333/0001-82'), false);
	assert.strictEqual(validateCnpjDigit('34028316000104'), false);

	assert.strictEqual(validateCnpjDigit('11111111111111'), false);
	assert.strictEqual(validateCnpjDigit('00.000.000/0000-00'), false);
	assert.strictEqual(validateCnpjDigit('99999999999999'), false);

	assert.strictEqual(validateCnpjDigit('1122233300018'), false);
	assert.strictEqual(validateCnpjDigit('112223330001811'), false);
	assert.strictEqual(validateCnpjDigit(''), false);

	assert.strictEqual(validateCnpjDigit('1122233300018a'), false);
	assert.strictEqual(validateCnpjDigit('ab.cde.fgh/ijkl-mn'), false);
});

test('validateCnpjDigit - should handle CNPJ with formatting', () => {
	assert.strictEqual(validateCnpjDigit('11.222.333/0001-81'), true);
	assert.strictEqual(validateCnpjDigit('11 222 333 0001 81'), true);
	assert.strictEqual(validateCnpjDigit('11-222-333-0001-81'), true);
});
