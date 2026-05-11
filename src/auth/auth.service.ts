import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  userRepository: any;
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // 🔥 REGISTER
  async register(name: string, email: string, password: string, role: string) {
    const existe = await this.userRepo.findOne({ where: { email } });

    if (existe) {
      return { message: 'El usuario ya existe' };
    }

    // 🔐 ENCRIPTAR
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepo.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'user', // 👈 por defecto usuario normal
    });

    return this.userRepo.save(user);
  }

  // 🔥 LOGIN
  async login(email: string, password: string) {
    const user = await this.userRepo.findOne({ where: { email } });

    if (!user) {
      return { message: 'Credenciales incorrectas' };
    }

    // 🔐 COMPARAR PASSWORD
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return { message: 'Credenciales incorrectas' };
    }

    return {
      access_token: this.jwtService.sign({
        name: user.name,
        email: user.email,
        role: user.role, // 🔥 ESTA ES LA CLAVE (YA LA TIENES BIEN)
        sub: user.id,
      }),
    };
  }

  getUsers() {
    return this.userRepo.find();
  }

  /*  deleteUser(id: number) {
    return this.userRepo.delete(id);
  } */

  updateUser(id: number, data: Partial<User>) {
    return this.userRepo.update(id, data);
  }

  async deleteUser(id: number) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const user = await this.userRepo.findOne({ where: { id } });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (user.role === 'superadmin') {
      throw new Error('No se puede eliminar el superadmin');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return this.userRepo.delete(id);
  }
}
