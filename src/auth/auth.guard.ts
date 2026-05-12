import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    const authHeader = request.headers.authorization;

    if (!authHeader) {
      console.log('❌ NO HEADER');
      throw new UnauthorizedException('No hay token');
      // return false;
    }

    const token = authHeader.split(' ')[1];

    if (!token || token === 'null') {
      console.log('❌ TOKEN NULL');
      throw new UnauthorizedException('Token inválido');
      // return false;
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      console.log('✅ TOKEN OK 👉', decoded);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      (request as any).user = decoded;

      return true;
    } catch (error) {
      console.log('❌ ERROR TOKEN 👉', error);
      return false;
    }
  }
}
