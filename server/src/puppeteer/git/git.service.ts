import { HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import simpleGit, { SimpleGit, SimpleGitOptions } from 'simple-git';
import { Crawler } from '../../schemas/Crawler.schema';
import { Repository } from 'typeorm';

@Injectable()
export class GitService {

    constructor(private httpService: HttpService,
        @InjectRepository(Crawler, 'mongo') private crawlerRepository: Repository<Crawler>) {}

    /**
     * devuelve una funcion Ts para ser ejecutada y hacer el mapper del
     * modelo de scrapping al modelo normalizado de un repo git
     * El repo git será el mismo que el de configuracion de spring cloud config
     * Este sirve los ficheros en modo texto a traves de las uris
     * http://server/{idMicro}/{entorno test,dev,pro..}/{git_branch}/{filename}
     * http://localhost:8888/servicio-item/prod/main/application.yml
    **/

   /*
   @todo: Solo implementado el happy path, falta exceptin en peticin de red y si la consulta no devuelve info
   */
    async getMappers(url : string):Promise<string> {
        let crawlers : Crawler[] = await this.crawlerRepository.find({url:url});
        let result = await this.httpService.get(crawlers[0].mapperUrl);
        return (await result.toPromise()).data;
    
    }

     /*
   @todo: Solo implementado el happy path, falta exceptin en peticin de red y si la consulta no devuelve info
   */
    async getNavigation(url : string):Promise<string> {
        let crawlers : Crawler[] = await this.crawlerRepository.find({url:url});
        let result = await this.httpService.get(crawlers[0].navigationUrl);
        return  (await (result.toPromise())).data;
        
    
    }
}
