import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from "class-validator";
import { UserRole } from "src/common/enums/user-role.enum";

export class SignUpDto {

	@IsOptional()
	@IsEnum(UserRole)
	role: UserRole = UserRole.USER;

	@IsString()
	name: string;

	@IsEmail()
	email: string;

	@IsString()
	@MinLength(6)
	password: string;
}