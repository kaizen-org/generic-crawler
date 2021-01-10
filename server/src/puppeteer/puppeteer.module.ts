import { Module } from '@nestjs/common';
import { PuppeteerService } from './puppeteer.service';
import { PuppeteerController } from './puppeteer.controller';
import { CodeHandlerService } from './code-handler/code-handler.service';

@Module({
  providers: [PuppeteerService, CodeHandlerService],
  controllers: [PuppeteerController]
})
export class PuppeteerModule {

  constructor(){
    console.log('Se ejecuta');
  }
}
