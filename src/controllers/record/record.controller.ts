import { Body, Controller, Get, Header, HttpCode, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CreateRecordDto } from '../../dtos/auth/createRecord.dto';
import { RecordService } from '../../services/record/record.service';
import { AuthGuard } from '../../guards/auth/auth.guard';
import { UpdateRecordDto } from '../../dtos/auth/updateRecord.dto';
import { ApiBearerAuth, ApiHeader, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('record')
@ApiTags('Record')
export class RecordController {
	constructor(
		private recordService: RecordService
	) { }

	@Get('/getAll')
	@HttpCode(HttpStatus.OK)
	// @ApiBearerAuth()
	// @ApiHeader({ name: 'authorization', description: 'Token Authorization' })
	get() {
		return this.recordService.getAll();
	}

	@Post('/create')
	@HttpCode(HttpStatus.CREATED)
	create(@Body() recordDto: CreateRecordDto) {
		return this.recordService.create(recordDto);
	}

	@Post('/update')
	@HttpCode(HttpStatus.OK)
	update(@Body() updateDto: UpdateRecordDto) {
		return this.recordService.update(updateDto);
	}

	@Get('/deleteById/:_id')
	@HttpCode(HttpStatus.OK)
	@ApiParam({ name: '_id', type: 'string' })
	@ApiHeader({ name: 'Auth' })
	delete(@Param('_id') _id: string) {
		return this.recordService.deleteById(_id);
	}

	@Get('/deleteAll')
	@HttpCode(HttpStatus.OK)
	deleteAll() {
		return this.recordService.deleteAll();
	}
}
