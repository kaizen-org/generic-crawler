import { Test, TestingModule } from '@nestjs/testing';
import { CodeHandlerService } from './code-handler.service';

describe('CodeHandlerService', () => {
  let service: CodeHandlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CodeHandlerService],
    }).compile();

    service = module.get<CodeHandlerService>(CodeHandlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
