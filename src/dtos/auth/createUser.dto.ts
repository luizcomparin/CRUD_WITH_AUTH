import { IsString } from "class-validator";

export class RegisterUserDto {
	@IsString({ message: (args) => `'${args.property}' must be of type STRING. Received value is '${args.value}' of type '${typeof args.value}'`, })
	fullName: string
	@IsString({ message: (args) => `'${args.property}' must be of type STRING. Received value is '${args.value}' of type '${typeof args.value}'`, })
	email: string
	@IsString({ message: (args) => `'${args.property}' must be of type STRING. Received value is '${args.value}' of type '${typeof args.value}'`, })
	password: string
}
