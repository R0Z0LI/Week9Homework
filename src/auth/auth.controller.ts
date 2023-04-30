import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Param,
} from '@nestjs/common';
import { UserAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, string>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('createAccount')
  createAccount(@Body() createAccountDto: Record<string, string>) {
    return this.authService.createAccount(
      createAccountDto.email,
      createAccountDto.password,
    );
  }
  @UseGuards(UserAuthGuard)
  @Get('characters/:pageId')
  getProfile(@Param() pageId: any) {
    console.log(pageId);
    return this.authService.getProfiles();
  }
}
