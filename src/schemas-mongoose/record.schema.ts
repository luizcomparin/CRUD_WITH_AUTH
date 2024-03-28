import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { CreateRecordDto } from "../dtos/record/createRecord.dto";
import { TypeEnum } from "../enums/type.enum";

export type ErrorLogDocument = HydratedDocument<Record>;

@Schema()
export class Record {
	@Prop({
		transform: (data) => {
			return data ? new Date(data).toISOString() : new Date().toISOString()
		}
	})
	createdAtIsoUtc: string
	@Prop({ transform: (data) => data ? new Date(data).toISOString() : data })
	dateIsoUtc: string
	@Prop()
	name: string
	@Prop()
	type: TypeEnum
	@Prop()
	value: number
}

export const RecordSchema = SchemaFactory.createForClass(Record);
