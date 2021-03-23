import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MarketHistory } from '../../schemas/MarketHistory.schema';
import { Post } from '../../schemas/Post.schema';
import { GitService } from '../git/git.service';

@Injectable()
export class CodeHandlerService {

    /**
     * associative object that contains
     *  { 
     *      url1: code1,
     *      url2: code2,
     *      . . .
     *  }
     */
    private codeMappersUrl: any = {}

 
    constructor(
        /*@InjectRepository(Post, 'mongo') private postRepository: Repository<Post>,*/
        
        @InjectRepository(MarketHistory, 'mongo') private marketHRepository: Repository<MarketHistory>,
        private gitService: GitService) {
        console.log("here");
    }

    async obtainFirstNavigation(url: string): Promise<string> {
        let data: string = await this.gitService.getNavigation(url);
        return data;
    }

    //Debe normalizar el dato (funcionará distinto en cada micro)
    public normalizeData(data: any): any {
        return JSON.parse(data);
    }

    public async processData(dataNormalized: any, url: string) {
        try {

       // let codeStr: string = await this.gitService.getMappers(url);
        let codeStr: string|null =  this.codeMappersUrl[url];
        if(!codeStr){
         codeStr = await this.gitService.getMappers(url);
         this.codeMappersUrl[url]=codeStr;
        }

            eval(codeStr);
        } catch (e) {
            console.error(e);
        }


    }
}
