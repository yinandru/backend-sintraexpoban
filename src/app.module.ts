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
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'datos',
      database: 'sintraexpoban',
      autoLoadEntities: true,
      synchronize: true, // ⚠️ solo desarrollo
    }),

    NoticiasModule,

    AuthModule,

    DirectivosModule, // 👈 ESTO ES CLAVE
  ],
})
export class AppModule {}
