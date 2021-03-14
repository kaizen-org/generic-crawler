import { Controller, Get, HttpException, HttpStatus, Param, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { LoggingInterceptor } from 'src/client/interceptors/logging.interceptor';
import { PuppeteerService } from './puppeteer.service';
/**
 * Controller that obtain custom code and do scraping from web
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
    async test(@Param('url') url : string= 'http://www.visualeconomy.com/'):Promise<any>{
        try{
        let result=await this.puppeteerService.executeCrawling(url);
        return result;
        }catch(e)
        {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: e.message,
              }, HttpStatus.FORBIDDEN);
        }
    }
}
