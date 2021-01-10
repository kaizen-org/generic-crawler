import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { LoggingInterceptor } from 'src/client/interceptors/logging.interceptor';
import { PuppeteerService } from './puppeteer.service';
/**
 * Controller that obtain custom code and do scrapind from web
 */
@Controller('puppeteer')
@ApiUseTags('PuppeteerCrawler')
//@UseInterceptors(LoggingInterceptor) Ver pq no funciona
export class PuppeteerController {

    private puppeteerService:PuppeteerService;
    constructor( puppeteerService:PuppeteerService){
        this.puppeteerService=puppeteerService;
    }

    @ApiOperation({ title: 'Execute the AJAX crawling in url specified' })
    @ApiResponse({
        status: 200,
        description: 'undefined',
        type: 'string',
        isArray: true,
    })
    @Get('test/:url')
    test(@Param('url') url : string= 'http://www.visualeconomy.com/'){
        this.puppeteerService.executeCrawling(url);
    }
}
