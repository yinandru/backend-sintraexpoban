import { Test, TestingModule } from '@nestjs/testing';
import { DirectivosController } from './directivos.controller';

describe('DirectivosController', () => {
  let controller: DirectivosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DirectivosController],
    }).compile();

    controller = module.get<DirectivosController>(DirectivosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
