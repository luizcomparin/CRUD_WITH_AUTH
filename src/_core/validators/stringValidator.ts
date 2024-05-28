import { ValidationArguments } from "class-validator";

export function stringValidationErrorMessage(args: ValidationArguments): string {
	return `'${args.property}' must be of type STRING. Received value is '${args.value}' of type '${typeof args.value}'`
}

