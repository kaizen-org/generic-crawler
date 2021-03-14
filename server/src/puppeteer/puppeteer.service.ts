import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import puppeteer  from 'puppeteer-core';
import { CodeHandlerService } from './code-handler/code-handler.service';
@Injectable()
export class PuppeteerService {
 logger = new Logger('PuppeteerService');


  private codeHandlerService: CodeHandlerService;
  private browser;
  private page;
    constructor(codeHandlerService: CodeHandlerService){
      this.codeHandlerService = codeHandlerService;
        console.log("here");
        //this.executeCrawling('http://www.visualeconomy.com/');
       (async () => {
        this.browser = await puppeteer.launch({
          //executablePath:'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
          //executablePath: '"C:/Program Files/Google/Chrome/Application/chrome.exe"',
          headless:true,
          devtools: true,
          executablePath: process.env.CHROMIUM_PATH,
          
          args: ['--no-sandbox', '--remote-debugging-port=9222'], // This was important. Can't remember why
        });
         
       })();  
      
    }

    public async  executeCrawling(url:string):Promise<any> {
      this.logger.log("executeCrawling");
            

          
            this.page = await this.browser.newPage();
            this.page.setDefaultNavigationTimeout(0); //desactiva el timeout de 30 segundos (valor en milliseconds)
            await this.page.goto(url);
                      
            //todo: ejecutar navigacion a medida hasta pagina que devuelve la info
             
            try{
            let code: string=await this.codeHandlerService.obtainFirstNavigation(url);
            this.logger.log("Creando funcion");
            var handler = new Function('page',code );
            //eval("debugger;console.log('in eval');var executor=async function(){\ndebugger;\n await page.waitForSelector('#aaaa')};\n\nawait page.goto('https://www.google.es');");
            await handler(this.page); //invoke the function using arguments
           
            }catch(e){
                
                this.logger.error('Error en obtainFirstNavigation',e);
               throw e;
            }
            
            await this.page.on('response', async resp  =>  {
              // var header = resp.headers();
              //resp.text().then(result => {
                // todo:  save respose AJAX in mongo
              //  console.log(result);
              //})
              console.log('--------------------'+resp.url());
             
              let data = await resp.text();
             
                try
                {
                  let dataNormalized = this.codeHandlerService.normalizeData(data);
                  await this.codeHandlerService.processData(dataNormalized,url);
                }catch(e){
                 // console.error(e);
                }
            });

            const client = await this.page.target().createCDPSession();
            await client.send('Network.enable');

            client.on('Network.webSocketCreated', ({requestId, url}) => {
              console.log('Network.webSocketCreated', requestId, url)
            })
            
            client.on('Network.webSocketClosed', ({requestId, timestamp}) => {
              console.log('Network.webSocketClosed', requestId, timestamp)
            })
            
            client.on('Network.webSocketFrameSent', ({requestId, timestamp, response}) => {
              console.log('Network.webSocketFrameSent', requestId, timestamp, response.payloadData)
            })
            
            client.on('Network.webSocketFrameReceived', ({requestId, timestamp, response}) => {
              console.log('Network.webSocketFrameReceived', requestId, timestamp, response.payloadData)
            })

            return 'localhost:9222/json';

           


              
          
          
          
    }

    public async stopCrawling():Promise<any>{
      this.page.close();
    }
};

