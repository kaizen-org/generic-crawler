import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import puppeteer  from 'puppeteer';
import { CodeHandlerService } from './code-handler/code-handler.service';
@Injectable()
export class PuppeteerService {

  private codeHandlerService: CodeHandlerService;
    constructor(codeHandlerService: CodeHandlerService){
      this.codeHandlerService = codeHandlerService;
        console.log("here")
        //this.executeCrawling('http://www.visualeconomy.com/');
      
    }

    public async  executeCrawling(url:string):Promise<void> {
       
            const browser = await puppeteer.launch({
              //executablePath:'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
              //executablePath: '"C:/Program Files/Google/Chrome/Application/chrome.exe"',
              headless:false
            });
            const page = await browser.newPage();
            await page.goto(url);
            //await page.screenshot({path: 'example.png'});
           

            //todo: ejecutar navigacion a medida hasta pagina que devuelve la info
            

            let info=await this.codeHandlerService.obtainFirstNavigation(url);
             
            await page.on('response', async resp  =>  {
              // var header = resp.headers();
              //resp.text().then(result => {
                // todo:  save respose AJAX in mongo
              //  console.log(result);
              //})
            
              let data = await resp.text();
             
              let dataNormalized = this.codeHandlerService.normalizeData(data);
              this.codeHandlerService.processData(dataNormalized);
              
            });
          
          
    }

}
