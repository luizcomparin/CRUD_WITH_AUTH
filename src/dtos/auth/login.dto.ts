import { IsString } from "class-validator"
import { stringValidationErrorMessage } from "src/validators/stringValidator"

export class LoginDto {
	// @IsString({ message: (args) => `'${args.property}' must be of type STRING. Received value is '${args.value}' of type '${typeof args.value}'`, })
	// @ValidateIf((object, value) => (value !== null && value !== undefined))
	// createdAtIsoUtc?: string
	@IsString({ message: stringValidationErrorMessage })
	email: string
	@IsString({ message: stringValidationErrorMessage })
	password: string
}
