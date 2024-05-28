import { ApiProperty } from "@nestjs/swagger"

export default class ErrorResponse {
	@ApiProperty()
	timestamp?: string
	@ApiProperty()
	path?: string
	@ApiProperty()
	request_obj?: any
	@ApiProperty()
	description?: string
	@ApiProperty()
	fullError?: any

	public constructor(init?: ErrorResponse) {
		Object.assign(this, init);
	}
}
