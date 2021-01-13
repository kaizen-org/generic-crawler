import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CrawConfig, CrawConfigDocument } from 'src/schemas/craw.config.schema';

@Injectable()
export class CodeHandlerService {

    private crawConfigModel: Model<CrawConfigDocument>;

    constructor( @InjectModel(CrawConfig.name)  crawConfigModel: Model<CrawConfigDocument>){
        this.crawConfigModel = crawConfigModel;
    }

    async obtainFirstNavigation(url:string):Promise<CrawConfigDocument>{
        return await this.crawConfigModel.findOne({url:url}).exec();
    }
}
