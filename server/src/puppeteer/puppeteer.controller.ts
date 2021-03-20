import { Controller, Get, HttpException, HttpStatus, Logger, Param, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { LoggingInterceptor } from 'src/client/interceptors/logging.interceptor';


import { PuppeteerService } from './puppeteer.service';
/**
 * Controller that obtain custom code and do scraping from web
 */
@Controller('puppeteer')
@ApiUseTags('PuppeteerCrawler')
//@UseInterceptors(LoggingInterceptor) -- Ver pq no funciona
export class PuppeteerController {
    logger = new Logger('PuppeteerController');

    private puppeteerService: PuppeteerService;
    constructor(puppeteerService: PuppeteerService) {
        this.puppeteerService = puppeteerService;
    }

    @ApiOperation({ title: 'Execute the AJAX crawling in url specified' })
    @ApiResponse({
        status: 200,
        description: 'undefined',
        type: 'string',
        isArray: true,
    })
    @Get('start/:url')
    async start(@Param('url') url: string = 'http://www.visualeconomy.com/'): Promise<any> {
        this.logger.log("start crawling={}",url);
        try {
            let result = await this.puppeteerService.executeCrawling(url);
            return result;
        } catch (e) {
            this.logger.error("ERROR={}",e);
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: e.message,
            }, HttpStatus.FORBIDDEN);
        }
    }

    @ApiOperation({ title: 'Execute the AJAX crawling in url specified in env URL_TO_CRAW' })
    @ApiResponse({
        status: 200,
        description: 'undefined',
        type: 'string',
        isArray: true,
    })
    @Get('start/')
    async startEnv(): Promise<any> {
        this.logger.log("start crawling={}",process.env.URL_TO_CRAW);
        try {
            let result = await this.puppeteerService.executeCrawling(process.env.URL_TO_CRAW);
            return result;
        } catch (e) {
            this.logger.error("ERROR={}",e);
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: e.message,
            }, HttpStatus.FORBIDDEN);
        }
    }


    
    @ApiOperation({ title: 'Stop the crawler' })
    @ApiResponse({
        status: 200,
        description: 'undefined',
        type: 'string',
        isArray: true,
    })
    @Get('stop')
    async stop(): Promise<void> {
        this.logger.log("stop crawling");
        try {
            await this.puppeteerService.stopCrawling();

        } catch (e) {
            this.logger.error("ERROR={}",e);
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: e.message,
            }, HttpStatus.FORBIDDEN);
        }
    }


}
