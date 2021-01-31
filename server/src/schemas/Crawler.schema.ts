import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity()
export class Crawler {

    @ObjectIdColumn()
    id: ObjectID;

    /**
     * Url a scrapear
     */
    @Column({unique:true})
    url: string;

    /**
     * Url de donde se extrea el codigo de mapeo
     */
    @Column()
    mapperUrl: string;

    /**
     * Url de donde se extra el codigo de navegacion 
     */ 
    @Column()
    navigationUrl: string;
}