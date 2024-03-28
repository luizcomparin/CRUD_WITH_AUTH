import { IsEnum, IsNumber, IsString, Validate, ValidateIf, ValidatorConstraint } from "class-validator"
import { TypeEnum } from "../../enums/type.enum"
import { IsDateFormat } from "../../validators/IsDateFormat.validator"
import { ApiProperty } from "@nestjs/swagger"
import { stringValidationErrorMessage } from "src/validators/stringValidator"

export class CreateRecordDto {
	@IsString({ message: stringValidationErrorMessage })
	name: string
	@IsEnum(TypeEnum, { message: (args) => `'${args.property}' must be one of following values: ${Object.keys(TypeEnum)}. Received value is '${args.value}' of type '${typeof args.value}'` })
	type: TypeEnum
	// @IsString({ message: (args) => `'${args.property}' must be of type STRING. Received value is '${args.value}' of type '${typeof args.value}'`, })
	// @IsDateFormat()
	// @ValidateIf((object, value) => (value !== null && value !== undefined))
	// @ApiProperty({ example: '2024-03-07T00:00:00.000Z | 2024-03-07' })
	// createdAtIsoUtc: string
	@IsString({ message: stringValidationErrorMessage })
	@IsDateFormat()
	@ApiProperty({ example: '2024-03-07T00:00:00.000Z | 2024-03-07' })
	dateIsoUtc: string
	@IsNumber({}, { message: (args) => `'${args.property}' must be of type NUMBER. Received value is '${args.value}' of type '${typeof args.value}'`, })
	value: number
}
