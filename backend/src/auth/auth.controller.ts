import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  register(@Body() signupDto: SignupDto) {
    return this.authService.register(signupDto);
  }

  @Get('test')
  test() {
    return { message: 'Auth route ok' };
  }
}
