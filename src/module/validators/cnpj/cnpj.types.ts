export interface CNPJOptions {
	skipDigitValidation?: boolean;
	removeFormat?: boolean;
	allowKnownInvalid?: boolean;
	message?: string | ((args: any) => string);
}
