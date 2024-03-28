import { ApiProperty } from "@nestjs/swagger"

export class RegisterResponse {
	@ApiProperty()
	email: string
	@ApiProperty()
	fullName: string
	@ApiProperty()
	password: string
	@ApiProperty()
	_id: string
	@ApiProperty()
	__v: number
}
