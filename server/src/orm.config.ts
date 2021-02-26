import { TypeOrmModuleOptions } from '@nestjs/typeorm';


const commonConf = {
    SYNCRONIZE: false,
    ENTITIES: [__dirname + '/domain/*.entity{.ts,.js}'],
    MIGRATIONS: [__dirname + '/migrations/**/*{.ts,.js}'],
    CLI: {
        migrationsDir: 'src/migrations',
    },
    MIGRATIONS_RUN: true,
};

let ormconfig: TypeOrmModuleOptions = {
    name: 'default',
    type: 'sqlite',
    database: '../target/db/sqlite-dev-db.sql',
    logging: true,
    synchronize: true,
    entities: commonConf.ENTITIES,
    migrations: commonConf.MIGRATIONS,
    cli: commonConf.CLI,
    migrationsRun: commonConf.MIGRATIONS_RUN,
};
let ormconfigMongo: TypeOrmModuleOptions = {
    name: 'mongo',
    type: "mongodb",
    
    host: "mongo",
    port: 27017,
    database: "test",
    synchronize: false,
    entities: [__dirname + '/schemas/*.schema{.ts,.js}'],
  
};

if (process.env.NODE_ENV === 'prod') {
    ormconfig = {
        name: 'default',
        type: 'mysql',
        database: 'jhipster',
        url: 'mysql://YOUR_USER:YOUR_PWD@localhost:27017/jhipster',
        logging: false,
        synchronize: commonConf.SYNCRONIZE,
        entities: commonConf.ENTITIES,
        migrations: commonConf.MIGRATIONS,
        cli: commonConf.CLI,
        migrationsRun: commonConf.MIGRATIONS_RUN,
    };
}

if (process.env.NODE_ENV === 'test') {
    ormconfig = {
        name: 'default',
        type: 'sqlite',
        database: ':memory:',
        keepConnectionAlive: true,
        logging: true,
        synchronize: true,
        entities: commonConf.ENTITIES,
        migrations: commonConf.MIGRATIONS,
        cli: commonConf.CLI,
        migrationsRun: commonConf.MIGRATIONS_RUN,
    };
}

export { ormconfig, ormconfigMongo };
