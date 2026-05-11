import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoticiasModule } from './noticias/noticias.module'; // importante
import { AuthModule } from './auth/auth.module';
import { DirectivosModule } from './directivos/directivos.module';

@Module({
  imports: [
    DirectivosModule,
    TypeOrmModule.forRoot({
      type: 'postgres',

      url: process.env.DATABASE_URL,

      autoLoadEntities: true,

      synchronize: true,

      ssl: {
        rejectUnauthorized: false,
      },
    }),

    NoticiasModule,

    AuthModule,

    DirectivosModule, // 👈 ESTO ES CLAVE
  ],
})
export class AppModule {}
