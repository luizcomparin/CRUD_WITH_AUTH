import { IsEnum, IsNumber, IsString, Validate, ValidateIf, ValidatorConstraint } from "class-validator"
import { TypeEnum } from "../../enums/type.enum"
import { IsDateFormat } from "../../validators/IsDateFormat.validator"

export class CreateRecordDto {
	@IsString({ message: (args) => `'${args.property}' must be of type STRING. Received value is '${args.value}' of type '${typeof args.value}'`, })
	name: string
	@IsEnum(TypeEnum, { message: (args) => `'${args.property}' must be one of following values: ${Object.keys(TypeEnum)}. Received value is '${args.value}' of type '${typeof args.value}'` })
	type: TypeEnum
	@IsString({ message: (args) => `'${args.property}' must be of type STRING. Received value is '${args.value}' of type '${typeof args.value}'`, })
	@IsDateFormat()
	@ValidateIf((object, value) => (value !== null && value !== undefined))
	createdAtIsoUtc: string
	@IsString({ message: (args) => `'${args.property}' must be of type STRING. Received value is '${args.value}' of type '${typeof args.value}'`, })
	@IsDateFormat()
	dateIsoUtc: string
	@IsNumber({}, { message: (args) => `'${args.property}' must be of type NUMBER. Received value is '${args.value}' of type '${typeof args.value}'`, })
	value: number
}
