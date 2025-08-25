import { ValidationOptions } from 'class-validator';

export interface ValidatorOptionsCustom extends ValidationOptions {
	lengthOnly?: boolean;
}
