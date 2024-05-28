import { Body, Controller, Get, Header, HttpCode, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { FuncionarioService } from './funcionario.service';
import { AuthGuard } from '../_core/guards/auth.guard';
import { ApiBearerAuth, ApiHeader, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateResponse } from '../responses/update.response';
import { DeleteResponse } from '../responses/delete.response';

@Controller('funcionario')
@ApiTags('Funcionario')
export class FuncionarioController {
	constructor(
		private funcionarioService: FuncionarioService
	) { }

	@Get('/getAll')
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ type: FuncionarioResponse, isArray: true, status: HttpStatus.OK })
	get() {
		return this.funcionarioService.getAll();
	}

	@Post('/create')
	@HttpCode(HttpStatus.CREATED)
	@ApiResponse({ type: FuncionarioResponse, status: HttpStatus.CREATED })
	create(@Body() funcionarioDto: CreateFuncionarioDto) {
		return this.funcionarioService.create(funcionarioDto);
	}

	@Post('/update')
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ type: UpdateResponse, status: HttpStatus.OK })
	update(@Body() updateDto: UpdateFuncionarioDto) {
		return this.funcionarioService.update(updateDto);
	}

	@Get('/deleteById/:_id')
	@HttpCode(HttpStatus.OK)
	@ApiParam({ name: '_id', type: 'string' })
	@ApiResponse({ type: DeleteResponse, status: HttpStatus.OK })
	delete(@Param('_id') _id: string) {
		return this.funcionarioService.deleteById(_id);
	}

	@Get('/deleteAll')
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ type: DeleteResponse, status: HttpStatus.OK })
	deleteAll() {
		return this.funcionarioService.deleteAll();
	}
}
