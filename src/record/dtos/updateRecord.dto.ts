import { IsEnum, IsNumber, IsString, ValidateIf } from "class-validator"
import { TypeEnum } from "../../_core/enums, types/type.enum"
import { IsDateFormat } from "../../_core/validators/IsDateFormat.validator"
import { ApiProperty } from "@nestjs/swagger"
import { stringValidationErrorMessage } from "src/_core/validators/stringValidator"
import { enumValidationErrorMessage } from "../../_core/validators/enumValidator"
import { numberValidationErrorMessage } from "../../_core/validators/numberValidator"

export class UpdateRecordDto {
    @IsString({ message: stringValidationErrorMessage })
    @ApiProperty({ example: '660390df6d11817b5bb7ab59' })
    _id: string
    @IsString({ message: stringValidationErrorMessage })
    name: string
    @IsEnum(TypeEnum, { message: (args) => enumValidationErrorMessage(TypeEnum, args) })
    type: TypeEnum
    // @IsString({ message: stringValidationErrorMessage })
    // @ValidateIf((object, value) => (value !== null && value !== undefined))
    // @IsDateFormat()
    // createdAtIsoUtc: string
    @IsString({ message: stringValidationErrorMessage })
    @IsDateFormat()
    @ApiProperty({ example: '2024-03-07T00:00:00.000Z | 2024-03-07' })
    dateIsoUtc: string
    @IsNumber({}, { message: numberValidationErrorMessage })
    value: number
}
