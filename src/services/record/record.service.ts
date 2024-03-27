import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecordDto } from '../../dtos/auth/createRecord.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Record, RecordSchema } from '../../schemas-mongoose/record.schema';
import { Model } from 'mongoose';
import { UpdateRecordDto } from '../../dtos/auth/updateRecord.dto';

export interface RecordWithId extends Record {
	_id: string
}

@Injectable()
export class RecordService {

	constructor(
		@InjectModel(Record.name)
		private recordModel: Model<Record>,
	) { }

	async getAll() {
		const allRecords = await this.recordModel.find<RecordWithId>()
		return allRecords
	}

	async create(recordDto: CreateRecordDto) {
		// const createdRecord = await this.recordModel.create(recordDto)
		const createdRecord = new this.recordModel(recordDto)
		return createdRecord.save()
	}

	async update(updateDto: UpdateRecordDto) {
		const userFound = await this.recordModel.findOne<RecordWithId>({ _id: updateDto._id.toString() });

		if (!userFound) {
			throw new NotFoundException();
		}
		const updatedUser = await this.recordModel.updateOne(
			{ _id: updateDto._id.toString() },
			updateDto
		)
		return updatedUser;
	}

	async deleteById(_id: string) {
		const deletedUser = await this.recordModel.deleteOne(
			{ _id: _id.toString() }
		)
		return deletedUser;
	}

	async deleteAll() {
		return await this.recordModel.deleteMany();
	}

}
