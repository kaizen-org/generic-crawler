import { Controller, Get } from '@nestjs/common';
import { PuppeteerService } from './puppeteer.service';
/**
 * Controller that obtain custom code and do scrapind from web
 */
@Controller('puppeteer')
export class PuppeteerController {

    private puppeteerService:PuppeteerService;
    constructor( puppeteerService:PuppeteerService){
        this.puppeteerService=puppeteerService;
    }

    @Get('test')
    test(){
        this.puppeteerService.executeCrawling('http://www.visualeconomy.com/');
    }
}
