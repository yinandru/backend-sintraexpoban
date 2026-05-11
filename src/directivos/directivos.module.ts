import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Directivo } from './directivos.entity';
import { DirectivosService } from './directivos.service';
import { DirectivosController } from './directivos.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Directivo]), AuthModule],
  providers: [DirectivosService],
  controllers: [DirectivosController],
})
export class DirectivosModule {}
