import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { stringValidationErrorMessage } from "src/validators/stringValidator";

export class UpdateUserDto {
	@IsString({ message: stringValidationErrorMessage })
	@ApiProperty({ example: '660390df6d11817b5bb7ab59' })
	_id: string
	@IsString({ message: stringValidationErrorMessage })
	fullName: string
	@IsString({ message: stringValidationErrorMessage })
	email: string
	@IsString({ message: stringValidationErrorMessage })
	password: string
}
