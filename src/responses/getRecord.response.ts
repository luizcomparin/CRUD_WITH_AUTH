import { ApiProperty } from "@nestjs/swagger"
import { TypeEnum } from "../_core/enums, types/type.enum"

export class RecordResponse {
    @ApiProperty({ example: '660390df6d11817b5bb7ab59' })
    _id: string
    @ApiProperty({ example: '2024-03-07T00:00:00.000Z' })
    dateIsoUtc: string
    @ApiProperty()
    name: string
    @ApiProperty({ enum: TypeEnum })
    type: TypeEnum
    @ApiProperty()
    value: number
    @ApiProperty()
    __v: number
}
