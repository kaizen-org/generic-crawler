import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { Post } from '../../schemas/Post.schema';
import { Repository } from 'typeorm';
import { PostRepository } from '../../repository/post.repository';
import { AuthorityRepository } from '../../repository/authority.repository';
import { MarketHistory } from '../../schemas/MarketHistory.schema';
import { RunnerDetail } from '../../schemas/RunnerDetail.schema';

@Injectable()
export class CodeHandlerService {
    processData(dataNormalized: any) {
      if(Array.isArray(dataNormalized) && dataNormalized.length>0 && dataNormalized[0].marketId){
       console.log("mercados"); 
       
       
       /*********Esto va a un mapper que será codigo personalizado *********** */
       for(let i in dataNormalized){
           let mh: MarketHistory = new MarketHistory();
           mh.marketId=dataNormalized[i].marketId;
           mh.marketStatus=dataNormalized[i].marketStatus;
           mh.timestamp=new Date();
           mh.runnerDetails=[];
           let runnerDetails: any[] =dataNormalized[i].runnerDetails;
           runnerDetails.forEach(runnerDetail => {
               let rDetail: RunnerDetail = new RunnerDetail();
               rDetail.runnerStatus = runnerDetail.runnerStatus;
               rDetail.selectionId = runnerDetail.selectionId;
               //No estoy seguro que esta cuota sea correcta
               rDetail.quota = runnerDetail.runnerOdds.trueOdds.decimalOdds.decimalOdds;
               mh.runnerDetails.push(rDetail);
            });
        /* ******************************************************************* */
           this.marketHRepository.save(mh).then(result => { console.log("Saved")});
       } 
      }
    
    }


    

   // private crawConfigModel: Model<CrawConfigDocument>;

   /* constructor( @InjectRepository(Post)
    private postRepository: Repository<Post>){ }
*/
    constructor(
        @InjectRepository(Post, 'mongo') private postRepository: Repository<Post>,
        @InjectRepository(MarketHistory, 'mongo') private marketHRepository: Repository<MarketHistory>,
        @InjectRepository(AuthorityRepository) private authorityRepository: AuthorityRepository
        /*, @InjectRepository(PostRepository) private postRepository: Repository<PostRepository>*/){ }

    async obtainFirstNavigation(url:string):Promise<void>{
       /* let marketHistory : MarketHistory = new MarketHistory();
        marketHistory.marketId = 'marketId';
        marketHistory.marketStatus = 'status';
        marketHistory.runnerDetails = [];
        let runner : RunnerDetail = new RunnerDetail();
        runner.runnerStatus = 'status';
        runner.selectionId = 'selectionId';
        marketHistory.runnerDetails.push(runner);
        await this.marketHRepository.save(marketHistory);

        let post:Post = new Post();
        post.text="text";
        post.title="title";
        return await this.postRepository.save(post);*/
         return; 
    }

    //Debe normalizar el dato (funcionará distinto en cada micro)
    normalizeData(data: any):any {
        return JSON.parse(data);
    }
}
