import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './module/auth.module';
import { ormconfig } from './orm.config';
import { PuppeteerModule } from './puppeteer/puppeteer.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './config';
// jhipster-needle-add-entity-module-to-main-import - JHipster will import entity modules here, do not remove
// jhipster-needle-add-controller-module-to-main-import - JHipster will import controller modules here, do not remove
// jhipster-needle-add-service-module-to-main-import - JHipster will import service modules here, do not remove

@Module({
    imports: [
        TypeOrmModule.forRoot(ormconfig),
        MongooseModule.forRoot(config.get('mongo.url')),
        AuthModule,
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
