import { ValidationArguments } from "class-validator";

export function enumValidationErrorMessage(_enum: any, args: ValidationArguments): string {
	return `'${args.property}' must be one of following values: ${Object.keys(_enum)}. Received value is '${args.value}' of type '${typeof args.value}'`
}

