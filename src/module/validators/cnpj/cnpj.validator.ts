export function validateCnpjDigit(cnpj: string): boolean {
	if (!cnpj || typeof cnpj !== 'string') return false;
	const cleaned = cnpj.replace(/\D/g, '');
	if (cleaned.length !== 14 || /^([0-9])\1{13}$/.test(cleaned)) return false;

	let sum = 0;
	let weight = 2;
	for (let i = 11; i >= 0; i--) {
		sum += parseInt(cleaned.charAt(i)) * weight;
		weight = weight === 9 ? 2 : weight + 1;
	}
	let firstCheck = sum % 11 < 2 ? 0 : 11 - (sum % 11);
	if (firstCheck !== parseInt(cleaned.charAt(12))) return false;

	sum = 0;
	weight = 2;
	for (let i = 12; i >= 0; i--) {
		sum += parseInt(cleaned.charAt(i)) * weight;
		weight = weight === 9 ? 2 : weight + 1;
	}
	let secondCheck = sum % 11 < 2 ? 0 : 11 - (sum % 11);
	return secondCheck === parseInt(cleaned.charAt(13));
}
