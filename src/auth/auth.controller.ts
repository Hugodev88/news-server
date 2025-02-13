import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('signup')
    async signUp(@Body() signupData: SignUpDto) {
        return this.authService.signUp(signupData)
    }

    @Post('login')
    async login(@Body() loginData: LoginDto) {
        return this.authService.login(loginData)
    }

}
