import { IsString } from "class-validator"
import { stringValidationErrorMessage } from "src/validators/stringValidator"

export class LoginDto {
	// @IsString({ message: stringValidationErrorMessage})
	// @ValidateIf((object, value) => (value !== null && value !== undefined))
	// createdAtIsoUtc?: string
	@IsString({ message: stringValidationErrorMessage })
	email: string
	@IsString({ message: stringValidationErrorMessage })
	password: string
}
