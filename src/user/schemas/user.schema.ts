import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { UserRole } from "src/common/enums/user-role.enum";

@Schema({ timestamps: true })
export class User extends Document {
	@Prop({ required: true })
	name: string;

	@Prop({ required: true, unique: true })
	email: string;

	@Prop({ required: true })
	password: string;

	@Prop({ required: true, enum: UserRole, default: UserRole.USER })
	role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
