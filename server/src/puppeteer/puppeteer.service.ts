import { Injectable } from '@nestjs/common';
import puppeteer  from 'puppeteer-core';
import { CodeHandlerService } from './code-handler/code-handler.service';
@Injectable()
export class PuppeteerService {

  private codeHandlerService: CodeHandlerService;
    constructor(codeHandlerService: CodeHandlerService){
      this.codeHandlerService = codeHandlerService;
        console.log("here")
        //this.executeCrawling('http://www.visualeconomy.com/');
        this.codeHandlerService.executeHandler();
    }

    public async  executeCrawling(url:string):Promise<void> {
       
            const browser = await puppeteer.launch({
              executablePath:'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
              headless:false
            });
            const page = await browser.newPage();
            await page.goto(url);
            //await page.screenshot({path: 'example.png'});
           

            //todo: ejecutar navigacion a medida hasta pagina que devuelve la info
            this.codeHandlerService.executeHandler();
             
            await page.on('response', resp  =>  {
              // var header = resp.headers();
              resp.text().then(result => {
                // todo:  save respose AJAX in mongo
                console.log(result);
              })
          
              // console.log("value: " + header['content-disposition']);
              
          });
          
            //await browser.close();
          
    }
}
