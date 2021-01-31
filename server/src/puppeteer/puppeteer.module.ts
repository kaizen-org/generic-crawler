import { HttpModule, Module } from '@nestjs/common';
import { PuppeteerService } from './puppeteer.service';
import { PuppeteerController } from './puppeteer.controller';
import { CodeHandlerService } from './code-handler/code-handler.service';
import { TypeOrmModule } from '@nestjs/typeorm';
//Cuidado en las importaciones que no ponga src
import { Category } from '../schemas/Category.schema';
import { Post } from '../schemas/Post.schema';
import { PostRepository } from '../repository/post.repository';
import { AuthorityRepository } from '../repository/authority.repository';
import { MarketHistory } from '../schemas/MarketHistory.schema';
import { RunnerDetail } from '../schemas/RunnerDetail.schema';
import { GitService } from './git/git.service';
import { Crawler } from '../schemas/Crawler.schema';

@Module({
  imports: [HttpModule,TypeOrmModule.forFeature([Crawler, Category, PostRepository, MarketHistory],'mongo'),
  TypeOrmModule.forFeature([AuthorityRepository])],
  providers: [PuppeteerService, CodeHandlerService, GitService],
  controllers: [PuppeteerController]
})
export class PuppeteerModule {

  constructor(){
    console.log('Se ejecuta');
  }
}
