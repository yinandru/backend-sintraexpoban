import { Test, TestingModule } from '@nestjs/testing';
import { DirectivosService } from './directivos.service';

describe('DirectivosService', () => {
  let service: DirectivosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DirectivosService],
    }).compile();

    service = module.get<DirectivosService>(DirectivosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
