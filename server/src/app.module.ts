import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { /*ormconfig,*/ ormconfigMongo } from './orm.config';
import { PuppeteerModule } from './puppeteer/puppeteer.module';
// jhipster-needle-add-entity-module-to-main-import - JHipster will import entity modules here, do not remove
// jhipster-needle-add-controller-module-to-main-import - JHipster will import controller modules here, do not remove
// jhipster-needle-add-service-module-to-main-import - JHipster will import service modules here, do not remove

@Module({
    imports: [
      // TypeOrmModule.forRoot(ormconfig),
        TypeOrmModule.forRoot(ormconfigMongo),
        //AuthModule,
        PuppeteerModule,
    // jhipster-needle-add-entity-module-to-main - JHipster will add entity modules here, do not remove
    ],
    controllers: [
    // jhipster-needle-add-controller-module-to-main - JHipster will add controller modules here, do not remove
    ],
    providers: [
    // jhipster-needle-add-service-module-to-main - JHipster will add service modules here, do not remove
    ],
})
export class AppModule {}
