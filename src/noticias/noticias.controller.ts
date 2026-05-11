import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  Delete,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { NoticiasService } from './noticias.service';
import { diskStorage } from 'multer';
import { AuthGuard } from '../auth/auth.guard';

@Controller('noticias')
export class NoticiasController {
  constructor(private noticiasService: NoticiasService) {}

  // ✅ PÚBLICO (cualquiera puede ver noticias)
  @Get()
  findAll() {
    return this.noticiasService.findAll();
  }

  // 🔐 PROTEGIDO (solo admin)
  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const nombre = Date.now() + '-' + file.originalname;
          cb(null, nombre);
        },
      }),
    }),
  )
  crear(@UploadedFile() file: any, @Body() body: any) {
    const imagenUrl = file
      ? `http://localhost:3000/uploads/${file.filename}`
      : null;

    return this.noticiasService.create({
      ...body,
      imagen: imagenUrl,
    });
  }

  // 🔐 PROTEGIDO
  @UseGuards(AuthGuard)
  @Delete(':id')
  eliminar(@Param('id') id: number) {
    return this.noticiasService.delete(id);
  }

  // 🔐 PROTEGIDO
  @UseGuards(AuthGuard)
  @Put(':id')
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const nombre = Date.now() + '-' + file.originalname;
          cb(null, nombre);
        },
      }),
    }),
  )
  update(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() body,
  ) {
    return this.noticiasService.update(id, body, file);
  }
}
