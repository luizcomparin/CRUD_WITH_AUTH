import { ApiProperty } from "@nestjs/swagger"

export class UpdateResponse {
	@ApiProperty()
	acknowledged: boolean
	@ApiProperty()
	modifiedCount: number
	@ApiProperty()
	upsertedId: number
	@ApiProperty()
	upsertedCount: number
	@ApiProperty()
	matchedCount: number
}
