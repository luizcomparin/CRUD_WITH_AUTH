import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../../services/auth/auth.service';
import { LoginDto } from '../../dtos/auth/login.dto';
import { RegisterUserDto } from '../../dtos/auth/createUser.dto';
import { Public } from '../../decorators/public/public.decorator';
import { AuthGuard } from '../../guards/auth/auth.guard';
import { UpdateUserDto } from '../../dtos/auth/updateUser.dto';

@Controller('auth')
@ApiTags('Auth')
// @ApiExtraModels(CommonResponse)
export class AuthController {
	constructor(
		private readonly authService: AuthService,
	) { }

	@Public()
	@Post('/login')
	@HttpCode(HttpStatus.OK)
	postLogin(@Body() loginDto: LoginDto) {
		return this.authService.login(loginDto);
	}

	@Public()
	@Post('/register')
	@HttpCode(HttpStatus.CREATED)
	postRegister(@Body() registerDto: RegisterUserDto) {
		return this.authService.register(registerDto);
	}

	@Post('/update')
	@HttpCode(HttpStatus.OK)
	update(@Body() update: UpdateUserDto) {
		return this.authService.update(update);
	}

	@Get('/deleteById/:_id')
	@HttpCode(HttpStatus.OK)
	@ApiParam({ name: '_id', type: 'string' })
	delete(@Param('_id') _id: string) {
		return this.authService.deleteById(_id);
	}

	@Get('/deleteAll')
	@HttpCode(HttpStatus.OK)
	deleteAll() {
		return this.authService.deleteAll();
	}

}
