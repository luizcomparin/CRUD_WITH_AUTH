import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ErrorLogDocument = HydratedDocument<User>;

@Schema()
export class User {
	@Prop({ transform: (data) => data ? data : new Date(data).toISOString() })
	createdAtIsoUtc: string
	@Prop()
	email: string
	@Prop()
	fullName: string
	@Prop()
	password: string
}

export const UserSchema = SchemaFactory.createForClass(User);
