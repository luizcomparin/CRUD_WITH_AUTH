import { ApiProperty } from "@nestjs/swagger"

export class DeleteResponse {
	@ApiProperty()
	acknowledged: boolean
	@ApiProperty()
	deletedCount: number
}
