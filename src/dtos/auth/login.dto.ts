import { IsString, ValidateIf } from "class-validator";

export class LoginDto {
	// @IsString({ message: (args) => `'${args.property}' must be of type STRING. Received value is '${args.value}' of type '${typeof args.value}'`, })
	// @ValidateIf((object, value) => (value !== null && value !== undefined))
	// createdAtIsoUtc?: string
	@IsString({ message: (args) => `'${args.property}' must be of type STRING. Received value is '${args.value}' of type '${typeof args.value}'`, })
	email: string
	@IsString({ message: (args) => `'${args.property}' must be of type STRING. Received value is '${args.value}' of type '${typeof args.value}'`, })
	password: string
}
