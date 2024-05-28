import { IsEnum, IsNumber, IsString, Validate, ValidateIf, ValidatorConstraint } from "class-validator"
import { TypeEnum } from "../../_core/enums, types/type.enum"
import { IsDateFormat } from "../../_core/validators/IsDateFormat.validator"
import { ApiProperty } from "@nestjs/swagger"
import { stringValidationErrorMessage } from "src/_core/validators/stringValidator"
import { numberValidationErrorMessage } from "../../_core/validators/numberValidator"
import { enumValidationErrorMessage } from "../../_core/validators/enumValidator"

export class CreateRecordDto {
    @IsString({ message: stringValidationErrorMessage })
    name: string
    @IsEnum(TypeEnum, { message: (args) => enumValidationErrorMessage(TypeEnum, args) })
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
    @IsNumber({}, { message: numberValidationErrorMessage })
    value: number
}
