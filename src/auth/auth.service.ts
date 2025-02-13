import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dtos/signup.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/schemas/user.schema';
import { Model } from 'mongoose';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {

	constructor(
		@InjectModel(User.name) private UserModel: Model<User>,
		private readonly jwtService: JwtService,

	) { }

	async signUp(signupData: SignUpDto) {

		const { email, password, name } = signupData

		const emailInUse = await this.UserModel.findOne({ email })

		if (emailInUse) {
			throw new BadRequestException("Email already in use")
		}

		const hashedPassword = await hash(password, 10)

		return await this.UserModel.create({
			name,
			email,
			password: hashedPassword,
		})
	}

	async login(loginData: LoginDto) {
		const { email, password } = loginData
		const user = await this.UserModel.findOne({ email })

		if (!user) {
			throw new UnauthorizedException("Wrong credentials")
		}

		const passwordMatch = await compare(password, user.password)

		if (!passwordMatch) {
			throw new UnauthorizedException("Wrong credentials")
		}

		const payload: JwtPayload = {
			name: user.name,
			role: user.role,
			email: user.email
		}

		const accessToken = this.jwtService.sign(payload);

		return { access_token: accessToken };
	}


}
