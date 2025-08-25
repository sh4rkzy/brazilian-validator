import { test } from 'poku';
import { strict as assert } from 'assert';
import {
	validateDigit,
	validateCpfDigit,
	validateCnpjDigit,
} from '../src/index';

test('Simple validation tests - basic functionality', () => {
	// Test validateDigit
	assert.strictEqual(validateDigit('5'), true);
	assert.strictEqual(validateDigit('a'), false);

	// Test validateCpfDigit
	assert.strictEqual(validateCpfDigit('11144477735'), true);
	assert.strictEqual(validateCpfDigit('11144477736'), false);

	// Test validateCnpjDigit
	assert.strictEqual(validateCnpjDigit('11222333000181'), true);
	assert.strictEqual(validateCnpjDigit('11222333000182'), false);
});
