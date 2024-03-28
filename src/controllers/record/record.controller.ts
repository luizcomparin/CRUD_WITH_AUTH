import { Body, Controller, Get, Header, HttpCode, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CreateRecordDto } from '../../dtos/record/createRecord.dto';
import { RecordService } from '../../services/record/record.service';
import { AuthGuard } from '../../guards/auth/auth.guard';
import { UpdateRecordDto } from '../../dtos/record/updateRecord.dto';
import { ApiBearerAuth, ApiHeader, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Record } from '../../schemas-mongoose/record.schema';
import { RecordResponse } from '../../responses/getRecord.response';
import { UpdateResponse } from '../../responses/update.response';
import { DeleteResponse } from '../../responses/delete.response';

@Controller('record')
@ApiTags('Record')
export class RecordController {
	constructor(
		private recordService: RecordService
	) { }

	@Get('/getAll')
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ type: RecordResponse, isArray: true, status: HttpStatus.OK })
	get() {
		return this.recordService.getAll();
	}

	@Post('/create')
	@HttpCode(HttpStatus.CREATED)
	@ApiResponse({ type: RecordResponse, status: HttpStatus.CREATED })
	create(@Body() recordDto: CreateRecordDto) {
		return this.recordService.create(recordDto);
	}

	@Post('/update')
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ type: UpdateResponse, status: HttpStatus.OK })
	update(@Body() updateDto: UpdateRecordDto) {
		return this.recordService.update(updateDto);
	}

	@Get('/deleteById/:_id')
	@HttpCode(HttpStatus.OK)
	@ApiParam({ name: '_id', type: 'string' })
	@ApiResponse({ type: DeleteResponse, status: HttpStatus.OK })
	delete(@Param('_id') _id: string) {
		return this.recordService.deleteById(_id);
	}

	@Get('/deleteAll')
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ type: DeleteResponse, status: HttpStatus.OK })
	deleteAll() {
		return this.recordService.deleteAll();
	}
}
