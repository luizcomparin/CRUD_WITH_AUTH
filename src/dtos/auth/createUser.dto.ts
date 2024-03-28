import { IsString } from "class-validator";
import { stringValidationErrorMessage } from "src/validators/stringValidator";

export class RegisterUserDto {
	@IsString({ message:  stringValidationErrorMessage, })
	fullName: string
	@IsString({ message: stringValidationErrorMessage})
	email: string
	@IsString({ message: stringValidationErrorMessage })
	password: string
}

