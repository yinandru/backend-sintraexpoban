import { Module } from '@nestjs/common';
import { NoticiasService } from './noticias.service';
import { NoticiasController } from './noticias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Noticia } from './noticia.entity';

// 👇 IMPORTANTE
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Noticia]),

    // 🔥 AGREGA ESTO
    JwtModule.register({
      secret: 'mi_secreto',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [NoticiasController],
  providers: [NoticiasService],
})
export class NoticiasModule {}
