import { Controller, Post, Body, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Get } from '@nestjs/common';
import { Delete, Param } from '@nestjs/common';
// import { UseGuards } from '@nestjs/common';
// import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() body: any) {
    return this.authService.register(
      body.name,
      body.email,
      body.password,
      body.role,
    );
  }

  @Post('login')
  login(@Body() body: any) {
    return this.authService.login(body.email, body.password);
  }

  @Get('users')
  getUsers() {
    return this.authService.getUsers();
  }

  @Delete('users/:id')
  deleteUser(@Param('id') id: number) {
    return this.authService.deleteUser(id);
  }

  @Put('users/:id')
  updateUser(@Param('id') id: number, @Body() body: any) {
    return this.authService.updateUser(id, body);
  }
}
