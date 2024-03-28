import { IsEnum, IsNumber, IsString, ValidateIf } from "class-validator"
import { TypeEnum } from "../../enums/type.enum"
import { IsDateFormat } from "../../validators/IsDateFormat.validator"
import { ApiProperty } from "@nestjs/swagger"

export class UpdateRecordDto {
	@IsString({ message: (args) => `'${args.property}' must be of type STRING. Received value is '${args.value}' of type '${typeof args.value}'`, })
	@ApiProperty({ example: '660390df6d11817b5bb7ab59' })
	_id: string
	@IsString({ message: (args) => `'${args.property}' must be of type STRING. Received value is '${args.value}' of type '${typeof args.value}'`, })
	name: string
	@IsEnum(TypeEnum, { message: (args) => `'${args.property}' must be one of following values: ${Object.keys(TypeEnum)}. Received value is '${args.value}' of type '${typeof args.value}'` })
	type: TypeEnum
	// @IsString({ message: (args) => `'${args.property}' must be of type STRING. Received value is '${args.value}' of type '${typeof args.value}'`, })
	// @ValidateIf((object, value) => (value !== null && value !== undefined))
	// @IsDateFormat()
	// createdAtIsoUtc: string
	@IsString({ message: (args) => `'${args.property}' must be of type STRING. Received value is '${args.value}' of type '${typeof args.value}'`, })
	@IsDateFormat()
	@ApiProperty({ example: '2024-03-07T00:00:00.000Z | 2024-03-07' })
	dateIsoUtc: string
	@IsNumber({}, { message: (args) => `'${args.property}' must be of type NUMBER. Received value is '${args.value}' of type '${typeof args.value}'`, })
	value: number
}
