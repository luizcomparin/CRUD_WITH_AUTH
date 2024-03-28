import { ApiProperty } from "@nestjs/swagger"

class User {
	@ApiProperty({ example: '660390df6d11817b5bb7ab59' })
	_id: string
	@ApiProperty()
	fullName: string
	@ApiProperty()
	email: string
}

export class LoginResponse {
	@ApiProperty()
	accessToken: string
	@ApiProperty({ type: User })
	user: User
}
