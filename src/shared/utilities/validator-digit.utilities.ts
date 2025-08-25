export function validateDigit(digit: string): boolean {
	const regex = /^[0-9]{1}$/;
	return regex.test(digit);
}

export function validateCpfDigit(cpf: string): boolean {
	const cleaned = cpf.replace(/\D/g, '');
	if (cleaned.length !== 11 || /^([0-9])\1{10}$/.test(cleaned)) return false;

	let sum = 0;
	for (let i = 0; i < 9; i++) {
		sum += parseInt(cleaned.charAt(i)) * (10 - i);
	}
	let firstCheck = (sum * 10) % 11;
	if (firstCheck === 10) firstCheck = 0;
	if (firstCheck !== parseInt(cleaned.charAt(9))) return false;

	sum = 0;
	for (let i = 0; i < 10; i++) {
		sum += parseInt(cleaned.charAt(i)) * (11 - i);
	}
	let secondCheck = (sum * 10) % 11;
	if (secondCheck === 10) secondCheck = 0;
	return secondCheck === parseInt(cleaned.charAt(10));
}

export function validateCnpjDigit(cnpj: string): boolean {
	const cleaned = cnpj.replace(/\D/g, '');
	if (cleaned.length !== 14 || /^([0-9])\1{13}$/.test(cleaned)) return false;

	const validate = (length: number) => {
		let sum = 0;
		let pos = length - 7;
		for (let i = 0; i < length; i++) {
			sum += parseInt(cleaned.charAt(i)) * pos--;
			if (pos < 2) pos = 9;
		}
		let result = sum % 11;
		return result < 2 ? 0 : 11 - result;
	};

	const firstCheck = validate(12);
	if (firstCheck !== parseInt(cleaned.charAt(12))) return false;
	const secondCheck = validate(13);
	return secondCheck === parseInt(cleaned.charAt(13));
}
