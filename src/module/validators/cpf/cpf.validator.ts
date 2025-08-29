export function validateCpfDigit(cpf: string): boolean {
	if (!cpf || typeof cpf !== 'string') return false;
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
