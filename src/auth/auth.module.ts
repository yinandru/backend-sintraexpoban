import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'secretKey', // 👈 ESTA CLAVE
      signOptions: { expiresIn: '1h' }, // ⏱ expira en 1 hora
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],

  // 👇 AGREGA ESTO
  exports: [JwtModule],
})
export class AuthModule {}
