import { ValidationArguments } from "class-validator";

export function numberValidationErrorMessage(args: ValidationArguments): string {
	return `'${args.property}' must be of type NUMBER. Received value is '${args.value}' of type '${typeof args.value}'`
}

